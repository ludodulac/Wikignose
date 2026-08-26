(() => {
  const $ = (id) => document.getElementById(id);
  const fileInput = $("pdfFile");
  const titleInput = $("bookTitle");
  const schoolInput = $("school");
  const courseInput = $("course");
  const currentInput = $("current");
  const mastersInput = $("masters");
  const prepareButton = $("prepareIndex");
  const status = $("adminStatus");
  const queue = $("adminQueue");
  const clearQueue = $("clearQueue");
  const STORAGE_KEY = "wikignose_admin_queue_v1";

  function loadQueue() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]"); }
    catch { return []; }
  }

  function saveQueue(items) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    renderQueue();
  }

  function humanSize(bytes) {
    if (!Number.isFinite(bytes)) return "";
    const units = ["o", "Ko", "Mo", "Go"];
    let value = bytes;
    let unit = 0;
    while (value >= 1024 && unit < units.length - 1) { value /= 1024; unit += 1; }
    return `${value.toFixed(unit ? 1 : 0)} ${units[unit]}`;
  }

  async function sha256(file) {
    if (!crypto?.subtle) return null;
    const buffer = await file.arrayBuffer();
    const digest = await crypto.subtle.digest("SHA-256", buffer);
    return [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, "0")).join("");
  }

  async function prepare() {
    const file = fileInput.files?.[0];
    if (!file) {
      status.textContent = "Choisis d’abord un PDF.";
      return;
    }

    prepareButton.disabled = true;
    status.textContent = "Préparation de la fiche d’indexation…";

    const fingerprint = await sha256(file).catch(() => null);
    const item = {
      id: `pending-${Date.now()}`,
      createdAt: new Date().toISOString(),
      fileName: file.name,
      fileSize: file.size,
      sha256: fingerprint,
      title: titleInput.value.trim() || file.name.replace(/\.pdf$/i, ""),
      school: schoolInput.value.trim(),
      course: courseInput.value.trim(),
      current: currentInput.value.trim(),
      masters: mastersInput.value.split(",").map((v) => v.trim()).filter(Boolean),
      lexicalStatus: "pending",
      thematicStatus: "pending",
      relevanceReindexRequested: true
    };

    const items = loadQueue();
    const duplicate = items.find((entry) => fingerprint && entry.sha256 === fingerprint);
    if (duplicate) {
      status.textContent = "Ce PDF est déjà présent dans la file d’indexation locale.";
    } else {
      items.unshift(item);
      saveQueue(items);
      status.textContent = "Ouvrage préparé. Il reste à joindre ce PDF à une conversation IA pour l’intégrer réellement au dépôt et à l’index.";
    }

    prepareButton.disabled = false;
  }

  function downloadManifest(item) {
    const blob = new Blob([JSON.stringify(item, null, 2)], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${item.fileName.replace(/\.pdf$/i, "")}-wikignose-index.json`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(link.href), 1000);
  }

  function removeItem(id) {
    saveQueue(loadQueue().filter((item) => item.id !== id));
  }

  function renderQueue() {
    const items = loadQueue();
    if (!items.length) {
      queue.innerHTML = '<div class="empty-state">Aucun ouvrage en attente dans ce navigateur.</div>';
      return;
    }

    queue.innerHTML = items.map((item) => `
      <article class="queue-item">
        <div>
          <strong>${escapeHtml(item.title)}</strong>
          <div class="result-meta">${escapeHtml(item.fileName)} · ${humanSize(item.fileSize)}</div>
          <div class="queue-statuses">
            <span class="tag">Occurrences : à indexer</span>
            <span class="tag">Pertinence : à indexer / recalibrer</span>
          </div>
        </div>
        <div class="queue-actions">
          <button type="button" class="ghost-button" data-download="${item.id}">Fiche JSON</button>
          <button type="button" class="ghost-button" data-remove="${item.id}">Retirer</button>
        </div>
      </article>`).join("");

    queue.querySelectorAll("[data-download]").forEach((button) => {
      button.addEventListener("click", () => {
        const item = loadQueue().find((entry) => entry.id === button.dataset.download);
        if (item) downloadManifest(item);
      });
    });
    queue.querySelectorAll("[data-remove]").forEach((button) => {
      button.addEventListener("click", () => removeItem(button.dataset.remove));
    });
  }

  function escapeHtml(value) {
    return String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  prepareButton.addEventListener("click", prepare);
  clearQueue.addEventListener("click", () => {
    if (confirm("Vider la file d’indexation locale ?")) saveQueue([]);
  });
  fileInput.addEventListener("change", () => {
    const file = fileInput.files?.[0];
    if (file && !titleInput.value.trim()) titleInput.value = file.name.replace(/\.pdf$/i, "");
  });

  renderQueue();
})();

document.addEventListener("DOMContentLoaded", () => {

  /* =======================================================
     MEDIA MODAL
     ======================================================= */

  const modal = document.getElementById("media-modal");
  const iframe = document.getElementById("media-modal-iframe");
  const closeButton = modal?.querySelector(".media-modal-close");
  const backdrop = modal?.querySelector(".media-modal-backdrop");


  function openVideo(url) {
    if (!modal || !iframe || !url) return;

    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");

    iframe.src = `${url}?autoplay=1&rel=0&playsinline=1`;
  }


  function closeVideo() {
    if (!modal || !iframe) return;

    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");

    iframe.src = "";
  }


  /* =======================================================
     GLOBAL CLICK HANDLER
     ======================================================= */

  document.addEventListener("click", (event) => {

    /* -------------------------------------------------------
       EXPANDABLE CASES — V2 / JOB
       ------------------------------------------------------- */

    const caseButton = event.target.closest(".case-toggle");

    if (caseButton) {
      const card = caseButton.closest(".featured-case");

      if (!card) return;

      if (!caseButton.dataset.closedLabel) {
        caseButton.dataset.closedLabel =
          caseButton.textContent.trim();
      }

      const isOpen = card.classList.toggle("is-open");

      caseButton.textContent = isOpen
        ? "Close details ↑"
        : caseButton.dataset.closedLabel;

      return;
    }


    /* -------------------------------------------------------
       VIDEO TRIGGERS
       ------------------------------------------------------- */

    const videoTrigger =
      event.target.closest(".video-trigger[data-video]");

    if (videoTrigger) {
      event.preventDefault();

      openVideo(videoTrigger.dataset.video);
    }

  });


  /* =======================================================
     CLOSE VIDEO
     ======================================================= */

  closeButton?.addEventListener("click", closeVideo);
  backdrop?.addEventListener("click", closeVideo);

  document.addEventListener("keydown", (event) => {
    if (
      event.key === "Escape" &&
      modal?.classList.contains("is-open")
    ) {
      closeVideo();
    }
  });

});
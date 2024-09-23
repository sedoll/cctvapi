(function() {
    const modal = document.getElementById("myModal");
    const video = document.getElementById("modalVideo");;

    // 버튼 클릭 시 모달을 열어서 비디오 재생
    function openCCTV() {
        const url = $.trim($("#input_url").val())
        if (!url) {
            alert('cctv url을 입력하세요')
            return false
        }

        modal.style.display = "block";

        if (Hls.isSupported()) {
            const video = document.getElementById("modalVideo");;
            const hls = new Hls();
            // .m3u8 파일 URL 설정
            hls.loadSource(url);
            hls.attachMedia(video);
            hls.on(Hls.Events.MANIFEST_PARSED, function() {
                video.play();
            });
        } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
            video.src = url;
            video.addEventListener('loadedmetadata', function() {
                video.play();
            });
        }
    }

    // 모달 닫기
    function closeModal() {
        modal.style.display = "none";
        modalVideo.pause();
    }

    // ESC 키로 모달 닫기
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    });

    // 모달 외부 클릭 시 모달 닫기
    window.onclick = function(event) {
        if (event.target == modal) {
            closeModal();
        }
    };

    window.openCCTV = openCCTV
    window.closeModal = closeModal
}())
<form id="uploadForm" enctype="multipart/form-data">
  <input type="file" id="fileInput" />
  <button type="submit">Upload</button>
</form>

<div id="result"></div>

<script>
document.getElementById("uploadForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const file = document.getElementById("fileInput").files[0];
  const reader = new FileReader();

  reader.onload = async () => {
    const base64Data = reader.result.split(",")[1]; // strip data URL prefix

    const res = await fetch("/.netlify/functions/upload", {
      method: "POST",
      body: base64Data,
    });

    document.getElementById("result").innerText = await res.text();
  };

  reader.readAsDataURL(file);
});
</script>

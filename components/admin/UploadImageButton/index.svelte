<script lang="ts">
  import { variables } from "$lib/variables";
  import { user } from "$lib/stores/user";
  import { uploadFileToS3 } from "$lib/utils/upload-file";
  import Modal from "$lib/components/admin/Modal.svelte";
  import ImagesUploadPreviewModal from "./ImagesUploadPreviewModal.svelte";

  export let actionCopy = "Upload Image";
  export let folder: "images" | "partners" = "images";
  export let onConfirm = (newImage: string) => {};

  let files, fileinput;
  let pending = false;
  $: token = $user !== null ? $user.access_token : null;

  function onWantToUpload() {
    fileinput.click();
  }

  async function onUploadToS3() {
    pending = true;
    const file = files[0];
    const newImage = await uploadFileToS3({ file: files[0], folder, token });

    onConfirm(newImage);

    files = undefined;
    pending = false;
  }

  function onCancel() {
    files = undefined;
  }
</script>

<div>
  <button class="btn-admin btn-primary btn-sm" on:click={onWantToUpload}>
    {actionCopy}
  </button>
  <input
    style="display:none"
    type="file"
    accept=".jpg, .jpeg, .png"
    bind:files
    bind:this={fileinput}
  />

  {#if files}
    <ImagesUploadPreviewModal
      {files}
      {pending}
      onConfirm={onUploadToS3}
      {onCancel}
    />
  {/if}
</div>

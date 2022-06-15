<div class="app-container">
    <div class="x">
        <div id="test" ondrop="dropHandler(event);" ondragover="dragOverHandler(event);" style="border:1px solid red; height:300px; width:300px;" >

        </div>
    </div>
</div>

<script type="text/javascript">

function dropHandler(ev) {

  // Prevent default behavior (Prevent file from being opened)
  ev.preventDefault();

  const file = ev.dataTransfer.items[0].getAsFile();

  const reader = new FileReader();
  reader.onload = function(evt) {
    console.log(evt.target);
  };
  reader.readAsDataURL(file);

}

function dragOverHandler(ev) {
  //console.log('File(s) in drop zone');

  // Prevent default behavior (Prevent file from being opened)
  ev.preventDefault();
}


</script>
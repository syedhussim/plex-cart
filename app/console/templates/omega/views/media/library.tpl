<div class="app-panel" ondrop="dropHandler(event);" ondragover="dragOverHandler(event);">
    <div class="container" id="test">

    </div>
</div>

<div class="app-container">
    <div style="margin:30px; width:100%; display:flex; align-items:center; justify-content:center;">
        <div style="background-color:#444; background-image: linear-gradient(45deg, #808080 25%, transparent 25%), linear-gradient(-45deg, #808080 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #808080 75%), linear-gradient(-45deg, transparent 75%, #808080 75%);
  background-size: 20px 20px;
  background-position: 0 0, 0 10px, 10px -10px, -10px 0px; width:75%"><img id="selectedImg" width="100%" /></div></div>
    </div>
</div>

<template id="item">
    <div class="data-row" onclick="select(this)">
        <div class="dy-fx pl-15 pr-15">
            <div class="dy-fx minw-80-px fx-jc-cr">
                <div><img data-name="img" class="wh-100-pc maxw-80-px " /></div>
            </div>
        </div>
        <div class="fx fx-fx-maxc pt-15 pb-15 pr-15 wh-350-px">
            <a data-name="name" class="fs-18 fw-500"></a>
            <div class="fs-13 fc-6 mt-5" data-name="created_time"></div>
            <div class="fx mt-10">
                <span class="attr-orange" data-name="size"></span>
                <span class="attr-green" data-name="type"></span>
            </div>
        </div>
    </div>
</template>

<script type="text/javascript">

    const media = ${JSON.stringify(media.toArray())};

    for(let item of media){
        item.img = '/' + item.name;
        render('test', 'item', item);
    }

function render(host, templateId, data = {}){

    let template = document.getElementById(templateId);
    let clone = template.content.cloneNode(true);
    let nodeList = clone.querySelectorAll('[data-name]');

    for(let node of nodeList){
        let name = node.dataset.name || '';
        
        switch(node.tagName){
            case 'IMG':
                node.src = data[name];
                break;
            default:
                node.innerHTML = data[name];
            
        }
    }

    document.getElementById(host).appendChild(clone);
}

let selectedRow = null;

function select(sender){
    sender.classList.add('data-row-selected');

    if(selectedRow != null){
        selectedRow.classList.remove('data-row-selected')
    }

    let imgSrc = sender.getElementsByTagName('img')[0].src;

    document.querySelector('#selectedImg').src = imgSrc

    selectedRow = sender;
}

function greyScale(){
    let canvas = document.querySelector('#canvas')
    let ctx = canvas.getContext("2d");

    ctx.filter = 'brightness(200%)';
    ctx.rotate(20 * Math.PI / 180);
        ctx.drawImage(img,0,0);

        document.querySelector('#selectedImg').src =  canvas.toDataURL();
}

function dropHandler(ev) {

    ev.preventDefault();

    const file = ev.dataTransfer.items[0].getAsFile();

    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = function(evt) {

        let img = document.createElement('img');
        img.src = URL.createObjectURL(file);

        img.onload = async function(){
            let canvas = document.createElement('canvas');
            canvas.width = img.width / 2;
            canvas.height = img.height / 2;

            let ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

            await fetch('/media/library', {
                method: 'POST',
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                },
                body: JSON.stringify({ image: reader.result , name: file.name, size : file.size, type : file.type })
            });

            //const content = await rawResponse.json();

            let data = {
                name : file.name,
                size : file.size,
                type : file.type,
                img :  canvas.toDataURL()
            };

            render('test', 'item', data);
        }
    };

}

function dragOverHandler(ev) {
  //console.log('File(s) in drop zone');

  // Prevent default behavior (Prevent file from being opened)
  ev.preventDefault();
}

</script>
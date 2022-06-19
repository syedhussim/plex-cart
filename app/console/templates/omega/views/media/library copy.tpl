<style>
    .thumb {
        width:150px;
        overflow : hidden;
    }
    .thumb img {
        width: 100%;
        display: block;
    }

    .thumb .heading{
        padding: 10px;
    }

    .grid-layout {
        display: flex;
        align-items: flex-start;
        align-self: start;
        flex-wrap : wrap;
        gap : 15px;
        justify-content : center;
    }
</style>


<div class="app-container fx-fd-cn">

<input type="text" />
    <div class="dy-fx wh-100-pc fx-fx-maxc" style=" width:100%" ondrop="dropHandler(event);" ondragover="dragOverHandler(event);">
        <div id="test" class="grid-layout" >
        </div>
    </div>
</div>

<template id="item">
    <div class="thumb">
        <div style="        border-radius: 4px; height:150px; overflow:hidden; align-items:center; display:flex; background-color:#444;
         background-image: linear-gradient(45deg, #808080 25%, transparent 25%), linear-gradient(-45deg, #808080 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #808080 75%), linear-gradient(-45deg, transparent 75%, #808080 75%);
  background-size: 20px 20px;
  background-position: 0 0, 0 10px, 10px -10px, -10px 0px;">
            <img data-name="img" />
        </div>
        <div class="heading">
            <div class="fw-700 fc-6" data-name="name" style="overflow:hidden; text-overflow: ellipsis; white-space: nowrap; text-align:center;"></div>
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
        //node.innerHTML = data[name];
    }

    document.getElementById(host).appendChild(clone);
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
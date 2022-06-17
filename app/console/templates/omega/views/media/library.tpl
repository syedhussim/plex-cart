<style>
    .thumb {
        width:250px;

        margin:10px;
        background-color:#fff;
        border-radius: 4px;s
    }
    .thumb img {
        width: 100%;
        display: block;
        border-top-left-radius: 4px;
        border-top-right-radius: 4px;
    }

    .thumb .heading{
        padding: 10px;
    }

    .grid-layout {
        display: flex;
        align-items: flex-start;
        align-self: start;
        flex-wrap : wrap;
    }
</style>


<div class="app-container">
    <div class="dy-fx wh-100-pc fx-fx-maxc" style="border:1px solid red; width:100%" ondrop="dropHandler(event);" ondragover="dragOverHandler(event);">
        <div id="test" class="grid-layout" >
        </div>
    </div>
</div>

<template id="item">
    <div class="thumb">
        <img data-name="img" />
        <div class="heading">
            <div class="fw-700 mb-10 fc-6">File Name <span data-name="name"></span></div>
            <span data-name="size" class="attr-orange"></span>
            <span data-name="type" class="attr-green"></span>
        </div>
    </div>
</template>

<script type="text/javascript">

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
        //console.log(evt.target);
        //document.getElementById('item')

        let img = document.createElement('img');
        img.src = URL.createObjectURL(file);

        img.onload = function(){
            let canvas = document.createElement('canvas');
            canvas.width = img.width / 2;
            canvas.height = img.height / 2;

            let ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

                    let data = {
            name : file.name,
            size : file.size,
            type : file.type,
            img :  canvas.toDataURL()
        };

        render('test', 'item', data);

            //document.getElementById('test').appendChild(canvas);
        }

        

        //

    };

}

function dragOverHandler(ev) {
  //console.log('File(s) in drop zone');

  // Prevent default behavior (Prevent file from being opened)
  ev.preventDefault();
}


</script>
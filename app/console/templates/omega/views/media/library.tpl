<div class="app-container-full">
    <div class="app-content-container">
        <div class="app-content-left-panel fx-fx-maxc" id="dropzone">
            <div class="app-content-header">
                <div class="inner-header">
                    <h4 class="fw-700">Media Library</h4>
                </div>
            </div>

            <div id="media" class="dy-fx" style="gap:10px; flex-wrap: wrap;"></div>
        </div>
    </div>
</div>

<template id="item">
    <div class="data-card" onclick="select(this)">
        <div class="dy-fx pl-15 pr-15">
            <div class="dy-fx minw-80-px fx-jc-cr">
                <div><img data-src="img" class="wh-100-pc maxw-80-px" /></div>
            </div>
        </div>
        <div class="dy-fx fx-fd-cn fx-ai-cr mt-10 mb-10 wh-100-pc">
            <a data-name="name" class="fs-16 fw-500 dy-ib"></a>
            <div class="fs-13 fc-6 mt-5 dy-ib" data-name="image_size"></div>
        </div>
    </div>
</template>


<script type="text/javascript">

    class MediaLibrary extends AppBase{

        mount(){
            const media = {{ JSON.stringify(media.toArray()) }};

            for(let item of media){
                item.img = '/' + item.name;
                item.image_size = item.image_size.join(' x ');
                this.render('media', 'item', item);
            }

            this.ondrop('#dropzone', (e, event) => {

                let that = this;

                event.preventDefault();

                const file = event.dataTransfer.items[0].getAsFile();

                const reader = new FileReader();

                reader.readAsDataURL(file);
                reader.onload = function(evt) {

                    let img = document.createElement('img');
                    img.src = URL.createObjectURL(file);

                    img.onload = async function(){

                        await fetch(window.location, {
                            method: 'POST',
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({ 
                                image: reader.result, 
                                name: file.name, 
                                file_size : file.size, 
                                image_size : [img.width, img.height],
                                type : file.type
                            })
                        });

                        let item = {
                            name : file.name,
                            image_size : [img.width, img.height].join(' x '),
                            img :  img.src
                        };

                        that.render('media', 'item', item);
                    }
                };
            });

            this.ondragover('#dropzone', (e, event) => {
                event.preventDefault();
            });
        }
    }

    new MediaLibrary();

</script>
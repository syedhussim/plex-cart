const Util = req('core.Util');
const ConsoleController = req('app.console.lib.ConsoleController');

class Library extends ConsoleController{

    async get(search = null){

        let mediaRef = this.db.collection('media');

        if(search){
            mediaRef.where('name', 'eq', search)
        }

        let media = await mediaRef.get();

        return await this.view.render('media/library',{
            product : { id : '' },
            media : media,
        });
    }

    async post(){
        
        let post = this.request.post();
        
        let image = {
            name : post.name,
            size : post.size,
            type : post.type
        };

        try{

            let file = "/home/syed/Desktop/plex-media/".concat(image.name);

            await Util.toImage(file, post.image);

            await this.db.collection('media').create(image);

            return {
                success : true
            }
        }catch(e){ console.log(e);
            return {
                success : false,
                message : e.message
            }
        }
    }
}

module.exports = Library;
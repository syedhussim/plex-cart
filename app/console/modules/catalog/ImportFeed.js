const WebRequest = req('core.WebRequest');
const XmlReader = req('core.parsers.XmlReader');
const Util = req('core.Util');
const ConsoleController = req('app.console.lib.ConsoleController');

class ImportFeed extends ConsoleController{

    async get(){
        let url = "https://www.perfumeshopping.com/feeds/google";

        const options = {
            host: 'www.perfumeshopping.com',
            port: 443,
            path: '/feeds/google',
            method: 'GET',
        };

        let x= await WebRequest.get(options);

        if(x.statusCode == 200){
            let z = XmlReader.parse(x.data);

            let itemNode = false;
            let nodeLevel = 0;
            let product = {};

            for(let t of z){

                if(t.type=='OPEN_TAG' && t.value == 'item'){
                    itemNode = true;

                    product = {
                        url : '',
                        name : '',
                        description : '',
                        price : 0,
                        visibility : 1,
                        sku : '',
                        barcode : '',
                        quantity : 0,
                        track_quantity : 0,
                        attributes : {}
                    };
                }

                if(itemNode){

                    switch(t.value){
                        case 'g:id':
                            if(t.type=='OPEN_TAG' && nodeLevel == 1){
                                let nextNode = z.next().value;
                                product['sku'] = nextNode.value;
                                z.next();
                            }
                            break;
                        case 'g:gtin':
                            if(t.type=='OPEN_TAG' && nodeLevel == 1){
                                let nextNode = z.next().value;
                                product['barcode'] = nextNode.value;
                                z.next();
                            }
                            break;
                        case 'title':     
                            if(t.type=='OPEN_TAG' && nodeLevel == 1){ 
                                let nextNode = z.next().value;
                                product['name'] = nextNode.value;
                                z.next();
                            }
                            break;
                        case 'description':     
                            if(t.type=='OPEN_TAG' && nodeLevel == 1){ 
                                let nextNode = z.next().value;
                                product['description'] = nextNode.value;
                                z.next();
                            }
                            break;
                        case 'g:price':     
                            if(t.type=='OPEN_TAG' && nodeLevel == 1){ 
                                let nextNode = z.next().value;
                                product['price'] = parseFloat(nextNode.value);
                                z.next();
                            }
                            break;
                        default:
                            if(t.type=='OPEN_TAG'){
                                nodeLevel++;
                            }
                            if(t.type=='CLOSE_TAG'){
                                nodeLevel--;
                            }
                    }
                }

                if(t.type=='CLOSE_TAG' && t.value == '/item'){
                    itemNode = false;
                    nodeLevel = 0;

                    await this._createProduct(product);
                }
            }
        }
    }

    async _createProduct(product){

        product.url = Util.url(product.name, 'product', product.sku); 

        await this.db.collection('products').create(product);
    }

}

module.exports = ImportFeed;
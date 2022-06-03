const express=require('express');
const app=express();

//middleware
app.use(express.json());

const products=[
    { id:1,name:'Can of paint'},
    { id:2,name:'Painting brush'},
    { id:3,name:'Colored pencils'},
];

// app.get('/',(req,res)=>{
//     res.send('hello');   
// });

app.get('/api/products',(req,res)=>{
    res.send(products);
});

//http GET-create
app.get('/api/products/:id',(req,res)=>{
    const product=products.find(c => c.id ==parseInt(req.params.id));
    if(!product) res.status(404).send('The product with the give ID was not found');
    res.send(product);
});

//http POST-read
app.post('/api/products',(req,res)=>{
    if(req.body.name||req.body.name.length<3){
        res.status(400).send('Name is required and min 3 char');
        return;
    }
    const product={
        id: product.length+1,
        name:req.body.name
    } 
    products.push(product);
    res.send(product);
});

//http PUT-update
app.put('/api/products/:id',(req,res)=>{

    const product=products.find(c => c.id ==parseInt(req.params.id));
    if(!product) return res.status(404).send('The product with the give ID was not found');

    if(req.body.name||req.body.name.length<3){
        res.status(400).send('Name is required and min 3 char');
        return;
    }

    product.name=req.body.name;
    res.send(product);
});

//http DELETE-delete
app.delete('/api/products/:id',(req,res)=>{
    const product=products.find(c => c.id ==parseInt(req.params.id));
    if(!product) return res.status(404).send('The product with the give ID was not found');

    const index=products.indexOf(product);
    products.splice(index,1);

    res.send(product);
});


const port=process.env.PORT || 3000;

app.listen(port,()=> console.log('listening on port '+ port+'...'));
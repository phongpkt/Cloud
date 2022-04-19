const path = require('path');
const express = require('express')
const Product = require('./models/Cars')
const Provider = require('./models/Providers')
const mongoose = require('mongoose')
const app = express()
const fs = require('fs')

app.set('view engine', 'hbs')
app.use(express.urlencoded({extended: true}))


//Home page
app.get('/', async (req, res) => {
    const query = await Product.find()
    res.render('home', {'products':query})
})
//Add page
app.get('/newProduct', async (req, res) => {
    const query = await Provider.find()
    res.render('product/newProduct', {'provider':query})
})
app.get('/newProvider', async (req, res) => {
    const query = await Product.find()
    res.render('provider/newProviders', {'product':query})
})
//Edit page
app.get('/editProduct', async (req, res) => {
    const id = req.query.id
    const prod = await Product.findById(id)
    const query = await Provider.find()
    res.render('product/editProduct', {'product':prod, 'provider':query})
})
app.get('/editProvider', async (req, res) => {
    const id = req.query.id
    const prov = await Provider.findById(id)
    const query = await Product.find()
    res.render('provider/editProvider', {'provider':prov, 'product':query})
})
//view page
app.get('/viewProducts',async (req, res)=>{
    const query = await Product.find()
    res.render('product/allProduct', {'products':query})
})
app.get('/viewProviders',async (req, res)=>{
    const query = await Provider.find()
    res.render('provider/providers', {'providers':query})
})
//View Details
app.get('/productDetail',async (req, res)=>{
    const id = req.query.id
    const query = await Product.findById(id).populate('provider')
    res.render('product/productDetails', {'product':query})
})
app.get('/providerDetail',async (req, res)=>{
    const id = req.query.id
    const query = await Provider.findById(id)
    res.render('provider/providerDetails', {'provider':query})
})

//Add Post
app.post('/newProduct',async (req, res) => {
    const name = req.body.txtName
    const price = req.body.txtPrice
    const description = req.body.txtDescription
    const picURL = req.body.picURL
    const providerId = req.body.provider
    const productEntity = new Product({'name':name,'price':price, 'description': description, 'picURL':picURL, provider:providerId})
    await productEntity.save();
    res.redirect('/viewProducts');
})
app.post('/newProvider',async (req, res) => {
    const name = req.body.txtName
    const phoneNumber = req.body.txtPhoneNo
    const email = req.body.txtEmail
    const address = req.body.txtAddress
    const picture = req.body.picture
    const providerEntity = new Provider({'name':name,'phoneNumber':phoneNumber, 'email': email, 'address':address, 'picture':picture})
    await providerEntity.save()
    res.redirect('/viewProviders')
})
//Edit Post
app.post('/editProduct', async (req, res) => {
    const id = req.body.id
    const name = req.body.txtName
    const price = req.body.txtPrice
    const description = req.body.txtDescription
    const picURL = req.body.picURL
    const providerId = req.body.provider

    var prod = await Product.findById(id)
    prod.name = name
    prod.price = price
    prod.description = description
    prod.picURL = picURL
    prod.provider = providerId
    prod.save((err)=>{
         if(!err)
            console.log("Ok")
            res.redirect("/")
     })     
})
app.post('/editProvider', async (req, res) => {
    const id = req.body.id
    const name = req.body.txtName
    const phoneNumber = req.body.txtPhoneNo
    const email = req.body.txtEmail
    const address = req.body.txtAddress
    const picture = req.body.picture

    var prov = await Provider.findById(id)
    prov.name = name
    prov.phoneNumber = phoneNumber
    prov.email = email
    prov.address = address
    prov.picture = picture
    prov.save((err)=>{
         if(!err)
            console.log("Ok")
            res.redirect("/")
     })     
})
//Delete
app.get('/delete',async (req, res) => {
    const id = req.query.id
    await Product.deleteOne({'_id' : id})
    res.redirect('/')
})
app.get('/delete1',async (req, res) => {
    const id = req.query.id
    await Provider.deleteOne({'_id' : id})
    res.redirect('/')
})
//Search
app.post('/searchProduct',async (req, res) => {
    const searchText = req.body.txtSearch
    const query = await Product.find({'name':searchText})
    res.render('allProduct', {'products':query})
})
app.post('/searchProvider',async (req, res) => {
    const searchText = req.body.txtSearch
    const query = await Provider.find({'name':searchText})
    res.render('providers', {'providers':query})
})

const PORT = process.env.PORT || 5000
app.listen(PORT)
console.log("Server is running at: " + PORT)
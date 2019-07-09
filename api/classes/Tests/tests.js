const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../../app");

// Configuración de chai
chai.use(chaiHttp);
chai.should();

describe("Tests de servicios", () => {
    // Pruebas de la búsqueda por id
    describe("Búsqueda de producto por ID", () => {
        it("Debería buscar un producto y devolverlo normalizado", (done) => {
            const id =  "MLA733099149" 
            chai.request(app)
            .get('/api/items/' + id)
            .end((err, res) => {
                 res.should.have.status(200);
                 res.body.should.be.a('object');
                 res.body.should.have.property('item');
                 res.body.should.have.property('author');
                 done();
            });
         });

        // Prueba con ID no valido
        it("Deberia devolver 404 si el ID de búsqueda no es válido", (done) => {
             const id = 5;
             chai.request(app)
            .get(`/${id}`)
            .end((err, res) => {
                 res.should.have.status(404);
                 done();
            });
        });
    });

    // Pruebas de la búsqueda por query
    describe("Búsqueda de productos por query", () => {
        it("Debería buscar un listado de productos y devolverlos normalizados ", (done) => {
            chai.request(app)
            .get('/api/items?q=perros')
            .end((err, res) => {
                 res.should.have.status(200);
                 res.body.should.be.a('object');
                 done();
            });
         });
        // Prueba con búsqueda vacía
        it("Debería devolver un error si no tiene query", (done) => {
            chai.request(app)
            .get('/api/items')
            .end((err, res) => {
                res.body.should.be.deep.equal({ error: 'No hay query' });
                done();
            });
         });
    });
});
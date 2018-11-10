window.onload = init;

//import Pagination from './pagination.html';
function init() {
    new Vue({
        el: '#app',
        components: {
            //Pagination
        },
        data: {
            todos: [0, 1],
            input: "",
            //nextid:11,
            currentPage:0,
            pageSize:'',
            visibleTodos:[],
            nbRestau:0,
            etatAdd:true,
            etatAdd2:true,
            idMod:"",
            newRestaurant: {
                nom: null,
                cuisine: null
            },
            filtrage:["anoir","simoi","imane"]
            
           
        },
        mounted() {
            console.log("--- MOUNTED, appelée avant le rendu de la vue ---");
            
            this.getDataFromWebService();
        },
      
        methods: {

            getDataFromWebService: function () {
              console.log("page size"+this.pageSize);
              let url = "http://localhost:8080/api/restaurants?page="+this.currentPage+"&pagesize="+this.pageSize;

                fetch(url).then((data) => {
                    console.log("les données sont arrivées !")
                    return data.json();
                }).then((dataEnJavaScript) => {
                    // ici on a bien un objet JS
                    this.todos = dataEnJavaScript.data;
                    this.nbRestau = dataEnJavaScript.count;
                    console.log("total !"+this.nbRestau);

                });
            },
            
            onchangee:function()
            {
                console.log("teeesttt"+this.pageSize);
                //this.pageSize=numberr;
                this.getDataFromWebService();
            }
       
         ,
         add:function()
         {
                this.etatAdd=false;
         },
         add2:function(index)
         {
             console.log("iiiddd"+index);
                this.idMod=index;
                this.etatAdd2=false;
         },
         Annuler:function()
         {
                this.etatAdd=true;
         },
         Annuler2:function()
         {
                this.etatAdd2=true;
         },
         //modification
          putRequest:function(event) {
            // Pour éviter que la page ne se ré-affiche
            event.preventDefault();
        
            // Récupération du formulaire. Pas besoin de document.querySelector
            // ou document.getElementById puisque c'est le formulaire qui a généré
            // l'événement
           
            // Récupération des valeurs des champs du formulaire
            // en prévision d'un envoi multipart en ajax/fetch
            let donneesFormulaire = new FormData(document.querySelector('formulaireModificationform'));
        
            let id = this.idMod; // on peut aller chercher la valeur
                                     // d'un champs d'un formulaire
                                     // comme cela, si on connait le nom
                                     // du champ (valeur de son attribut name)
        
            let url = "http://localhost:8080/api/restaurants/" + id;
        
            fetch(url, {
                method: "PUT",
                body: donneesFormulaire
            })
            .then(function(responseJSON) {
                responseJSON.json()
                    .then(function(res) {
                        // Maintenant res est un vrai objet JavaScript
                       // afficheReponsePUT(res);
                       console.log("resultat"+res.msg);
                    });
                })
                .catch(function (err) {
                    console.log(err);
            });
            console.log("total2 !"+this.nbRestau);

            this.getDataFromWebService();
        },
        
 afficheReponsePUT:function(reponse) {
    let div = document.querySelector("#reponsePUT");
    div.innerHTML = reponse.msg;

    // On affiche le tableau à jour
    getRequest1();
},
        
              // REQUETES POST
              postRequest: function(event) {
                        // Pour éviter que la page ne se ré-affiche
                       event.preventDefault();
                    console.log("poost1");
                        // Récupération du formulaire. Pas besoin de document.querySelector
                        // ou document.getElementById puisque c'est le formulaire qui a généré
                        // l'événement
                        //let form = event.target;

                        // Récupération des valeurs des champs du formulaire
                        // en prévision d'un envoi multipart en ajax/fetch
                        //let donneesFormulaire = new FormData(form);
                        let formee = new FormData(document.querySelector('formulaireInsertionform'));

                        let url = "http://localhost:8080/api/restaurants";
                        console.log(this.newRestaurant.nom);
                        console.log(this.newRestaurant.cuisine);
                        fetch(url, {
                            method: "POST",
                            body: formee
                        })
                        .then(function(responseJSON) {
                            responseJSON.json()
                                .then(function(res) {
                                    // Maintenant res est un vrai objet JavaScript
                                    console.log("poost2"+res);
                                  // afficheReponsePOST(res);
                                   
                                });
                            })
                            .catch(function (err) {
                                console.log(err);
                        });
                    },
                    

// REQUETES DELETE
 deleteRequest:function(index) {
    // Pour éviter que la page ne se ré-affiche
    event.preventDefault();

    // Récupération du formulaire. Pas besoin de document.querySelector
    // ou document.getElementById puisque c'est le formulaire qui a généré
    // l'événement
    //let form = event.target;
    console.log("iiddddiiiddd"+ index);
    let id = index; // on peut aller chercher la valeur
    console.log("iiddddiiiddd2222"+ id);                       // d'un champs d'un formulaire
                             // comme cela, si on connait le nom
                             // du champ (valeur de son attribut name)

    this.envoieRequeteFetchDelete(id);
}
,
 envoieRequeteFetchDelete:function(id) {
    console.log("iiddddiiiddd333"+typeof id); 
    let url = "http://localhost:8080/api/restaurants/" + id;

    fetch(url, {
        method: "DELETE",
    })
    .then(function(responseJSON) {
        responseJSON.json()
            .then(function(res) {
                // Maintenant res est un vrai objet JavaScript
              // afficheReponseDELETE(res);
             
            });
        })
        .catch(function (err) {
            console.log(err);
    });
    this.getDataFromWebService();
}
                    ,
                    
            Suivant: function()
            {
                this.currentPage++;
                if(this.currentPage >= (this.nbRestau/this.pageSize))
                {
                    console.log("current f page"+this.currentPage);
                    console.log("count f"+this.nbRestau);
                    console.log("condition f" +(this.nbRestau/this.pageSize));
                    this.currentPage--;
                    this.getDataFromWebService();
                }
                else
                {
                    
                    console.log("current page"+this.currentPage);
                    console.log("count"+this.nbRestau);
                    console.log("condition"+(this.nbRestau/this.pageSize));
                    this.getDataFromWebService();
                }
               
               
            },
            afficheReponsePOST: function(reponse) {
                console.log("poost3");
                let div = document.querySelector("#reponsePOST");
                div.innerHTML = reponse.msg;
            },
            Precedent: function()
            {
                this.currentPage--;
                if(this.currentPage<0)
                {
                    this.currentPage++;
                    console.log("current page"+this.currentPage);
                    this.getDataFromWebService();
                }
                else
                {
                    console.log("current page"+this.currentPage);
                    this.getDataFromWebService();
                }
                
               
            }
,

            
        
            addTodo: function () {
                this.todos.push({ title: this.input });
                //this.todos.push(this.todos.length)
                this.input = "";
                this.updateVisibleTodos();

            },
            removeTodo: function (index) {
                //console.log(index)
                this.todos.splice(index, 1);
                this.updateVisibleTodos();

            },
            getColor: function (index) {
                return (index % 2) ? 'red' : 'green';
            },
           
        }
    })
}

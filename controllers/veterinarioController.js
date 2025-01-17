import Veterinario from "../models/Veterinario.js";


const registrar=async(req, res)=>{

   const{email} = req.body;

   //Prrevenir usuaios duplicados
   const existeUsuario=await Veterinario.findOne({email});
   if(existeUsuario){
    const error=new Error("Usuario ya registrado")
       return res.status(400).json({msg: error.message});
   }
try{
    //Guardar un nuevo veterinario
    const veterinario = new Veterinario(req.body);
    const veterinarioGuardado=await veterinario.save();

    res.json(veterinarioGuardado);

}catch(error){
   console.log(error);

}

};
const perfil = (req, res) => {
    res.json({msg:"Mostrando Perfil"});

    };
 const confirmar = async(req, res) => {
    const{token} = req.params;

    const usuarioConfirmar = await Veterinario.findOne({token});

if(!usuarioConfirmar){
    const error=new Error("Token no válido")
       return res.status(400).json({msg: error.message});
   
}
try{
    usuarioConfirmar.token=null;
    usuarioConfirmar.confirmado=true;
    await usuarioConfirmar.save();

    res.json({msg:"Confirmado correctamente"});

}
catch(error){
   console.log(error);

}
   };
const autenticar = async(req,res) => {
    const {email, password} = req.body;

    //Comprobar si el ususario existe
    const usuario = await Veterinario.findOne({email});

    if(!usuario){
      const error = new Error("El usuario no existe");
      return res.status(404).json({msg: error.message});
       }
       //Comprobar si el usuario esta confirmado
       if(!usuario.confirmado){
        const error = new Error("Tu cuenta no ha sido confirmada");
        return res.status(403).json({msg: error.message});
       }
       
//Revisar el password
if(await usuario.comprobarPassword(password)){
   console.log("Password Correcto");
}
else{
   console.log("Password incorrecto")
}

    };

export{registrar, perfil, confirmar, autenticar};
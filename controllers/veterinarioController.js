import Veterinario from "../models/Veterinario.js";
import generarJWT from "../helpers/generarJWT.js";
import generarId from "../helpers/generarId.js";




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
  const{veterinario}=req;
    res.json({msg:"Mostrando Perfil"});

    };
    const confirmar = async (req, res) => {
      const { token } = req.params;
    
      const usuarioConfirmar = await Veterinario.findOne({ token });
    
      if (!usuarioConfirmar) {
        const error = new Error("Token no válido");
        return res.status(404).json({ msg: error.message });
      }
    
      try {
        usuarioConfirmar.token = null;
        usuarioConfirmar.confirmado = true;
        await usuarioConfirmar.save();
    
        res.json({ msg: "Usuario Confirmado Correctamente" });
      } catch (error) {
        console.log(error);
      }
    };

    const autenticar = async (req, res) => {
      const { email, password } = req.body;
    
      // Comprobar si el usuario existe
      const usuario = await Veterinario.findOne({ email });
      if (!usuario) {
        const error = new Error("El Usuario no existe");
        return res.status(404).json({ msg: error.message });
      }
      // Comprobar si el usuario esta confirmado
      if (!usuario.confirmado) {
        const error = new Error("Tu Cuenta no ha sido confirmada");
        return res.status(403).json({ msg: error.message });
      }
           
      // Revisar el password
      if (await usuario.comprobarPassword(password)) {
        // Autenticar
        return res.json({ token: generarJWT(usuario.id) }); // Solo una respuesta
      } else {
        const error = new Error("El Password es incorrecto");
        return res.status(403).json({ msg: error.message }); // Solo una respuesta
      }
  

    };
    const olvidePassword = async(req, res) => {
      const{email}=req.body;

      const existeVeterinario = await Veterinario.findOne({ email});

      if(!existeVeterinario){
        const error=new Error("El Usuario no existe")
        return res.status(400).json({msg: error.message});
      }
      try {
        existeVeterinario.token = generarId();
        await existeVeterinario.save();
        // Enviar email con el token
        //...
        res.json({ msg: "Se ha enviado un correo con las instrucciones" });
      } catch (error) {
        console.log(error);
       
        
      }
    };
    const comprobarToken = async(req, res) => {
     const {token} = req.params;

     const tokenValido = await Veterinario.findOne({token});
    
     if(tokenValido){
      //El token es valido el usuario existe
      res.json({msg:"Token válido"});
     
    
   
     }else{
      //El token no es valido el usuario no existe
      const error=new Error("El Token no es válido")
      return res.status(400).json({msg: error.message});
     }
       
     
    };
    const nuevoPassword = async(req, res) => {
      const{token} = req.params;
      const{password} = req.body;
      
      const veterinario =await Veterinario.findOne({token})
      
      if(!veterinario){
        const error=new Error("Hubo un error")
        return res.status(400).json({msg: error.message});

      }
      try {
        veterinario.token=null;
        veterinario.password=password;
        await veterinario.save();
        res.json({msg: "Password cambiada correctamente"});
                                                                                                                                                                                               
      } catch (error) {
        console.log(error);
      }
    };

    

export{registrar, perfil, confirmar, autenticar, olvidePassword, comprobarToken,nuevoPassword };
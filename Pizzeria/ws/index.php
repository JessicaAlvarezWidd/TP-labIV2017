<?php

require __DIR__ . '/vendor/autoload.php';

use \Firebase\JWT\JWT;

use \Psr\Http\Message\ServerRequestInterface as Request; //alias
use \Psr\Http\Message\ResponseInterface as Response; //alias

require 'vendor/autoload.php'; //composer, referencia a slim framework

$app = new \Slim\App; //clase de slim framework

//Evitar Problema con CORS
$app->options('/{routes:.+}', function ($request, $response, $args) {
    return $response;
});

$app->add(function ($req, $res, $next) {
    $response = $next($req, $res);
    return $response
            ->withHeader('Access-Control-Allow-Origin', 'http://localhost:4200') //La pagina donde este alojado.
            ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
            ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});
//Fin Evitar Problemas Con CORS
$app->post('/api', function ($request, $response, $args) {
     /*$archivoTmp = date("Ymd_His");
     $tipoArchivo = pathinfo($_FILES["file"]["name"], PATHINFO_EXTENSION);
     $dest = $archivoTmp.".".$tipoArchivo;
     $destino = "tmp/" . $dest;
     move_uploaded_file($_FILES["file"]["tmp_name"], $destino);
     return $dest;*/
        $retorno["Exito"] = TRUE;
            $archivoTmp = date("Ymd_His");
            $tipoArchivo = pathinfo($_FILES["file"]["name"], PATHINFO_EXTENSION);
            $nombreFoto = $archivoTmp.".".$tipoArchivo;
            $destino = "tmp/" . $nombreFoto;
            $retorno["foto"] = $nombreFoto;


        //VERIFICO EL TAMAÑO MAXIMO QUE PERMITO SUBIR
    if ($_FILES["file"]["size"] > 1000000) 
    {
    $retorno["Exito"] = FALSE;
    $retorno["Mensaje"] = "El archivo es demasiado grande. Verifique!!!";
    return json_encode($retorno);
    }

    //SI EL ARCHIVO NO ES UNA IMAGEN, RETORNA FALSE
    $esImagen = getimagesize($_FILES["file"]["tmp_name"]);
    if($esImagen === FALSE) 
    {
    $retorno["Exito"] = FALSE;
    $retorno["Mensaje"] = "Solo son permitidas IMAGENES";
    return json_encode($retorno);
    }
    else 
    {
    //CIERTAS EXTENSIONES
    if($tipoArchivo != "jpg" && $tipoArchivo != "jpeg" && $tipoArchivo != "gif" && $tipoArchivo != "png") 
    {
        $retorno["Exito"] = FALSE;
        $retorno["Mensaje"] = "Solo son permitidas imagenes con extension JPG, JPEG, PNG o GIF";
        return json_encode($retorno);
    }
    }


    if (!move_uploaded_file($_FILES["file"]["tmp_name"], $destino)) 
    {
    $retorno["Exito"] = FALSE;
    $retorno["Mensaje"] = "Ocurrio un error al subir el archivo. No pudo guardarse";
    return json_encode($retorno);
    }
    else
    {
    $retorno["Mensaje"] = "Archivo subido exitosamente!!!"; 
    $retorno["PathTemporal"] = $destino;
    return json_encode($retorno);
    }
    });

$app->post('/login', function (Request $request, Response $response)
{
    $usuario = new stdclass();
    $usuario->email =  $request->getParams()["email"];
    $usuario->password =  $request->getParams()["password"];

    $usuarioLogin = $usuario;

    $resultado = new stdClass();
    $resultado->exito = false;

    if (false)
        $resultado->mensaje = "No se encontro el usuario ingresado.";
    else
    {
        $resultado->exito = true;
        $resultado->mensaje = "Usuario encontrado en la base de datos!";

        //JWT
        $key = "example_key";
        $token = array(
            "iss" => "http://example.org",
            "aud" => "http://example.com",
            "iat" => 1356999524,
            "nbf" => 1357000000,
            "usuario" => $usuarioLogin
        );

        $resultado->token = JWT::encode($token, $key);
    }

    $response = $response->withJson($resultado);
    return $response->withHeader('Content-type', 'application/json');
});
 $app->get('/usuarios[/]', function ($request, $response, $args) 
    {
        $listado=Usuario::TraerUsuarios();
        return $response->withJson($listado);
   });
    $app->get('/token', function ($request, $response, $args) 
    {
        $headers = apache_request_headers();
        $key = "example_key";

        $tk = explode(' ', $headers['Authorization']);
        try 
        {
            $decoded = JWT::decode($tk[1], $key, array('HS256'));
        } 
        catch (Exception $e) 
        {

        }
        if ($decoded)
        {
            $rta['rta'] = $decoded;
        // return true;
        }
        else 
        {
            $rta['rta'] = false;
        }
        
        print_r(json_encode($rta));

        return;
        /**
        * IMPORTANT:
        * You must specify supported algorithms for your application. See
        * https://tools.ietf.org/html/draft-ietf-jose-json-web-algorithms-40
        * for a list of spec-compliant algorithms.
        */
        $jwt = JWT::encode($token, $key);
        $tok['token'] = $jwt;
        print_r(json_encode($tok));
        return;
   });

   $app->get('/mover/{foto}', function (Request $request, Response $response) {
        
    $nombreFoto = $request->getAttribute('foto');
    $pathOrigen = "tmp/".$nombreFoto;
    $pathDestino = "img/".$nombreFoto;
	if(is_file($pathOrigen))
	{
        $pasaje = copy($pathOrigen, $pathDestino);
        unlink($pathOrigen);
        $retorno["Exito"] = TRUE;
        $retorno["Mensaje"] = "Se movio correctamente la foto!";
    }
    else
    {
        $retorno["Exito"] = FALSE;
        $retorno["Mensaje"] = "Error al mover la foto!";
    }
    return $response->withJson($retorno);
});

$app->run();
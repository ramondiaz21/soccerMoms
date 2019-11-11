<?php  
	
	
	require_once("resources/clases/contenido.class.php");

	$id = $_GET["n"];

	$Contenido = new Contenido();

	$noticia = $Contenido->getnoticia($id);
	
	$url = "http://".$_SERVER['SERVER_NAME'].$_SERVER['REQUEST_URI'];
	//var_dump(API_PATH);
	if (empty($noticia)){
    	$noticia=array(
    	                'cabecera'=>"No se encontró la noticia",
    	                'url'=>"logo.png",
    	                'texto'=>"Lo sentimos, no se encontró la noticia.",
    	                'etiquetas'=>"",
    	                'fecha'=>date("d-m-Y"),
    	                'creador'=>'desconocido'
    	                );
    	$Facebook="";
    	$Twitter="";
    	$Whatsapp="";
	}
	else {
	    $noticia = $noticia[0];
	    //$texto = str_replace('class="hidden animated"','""',$noticia['texto']);
	    //var_dump();
	    $noticia['texto'] = $Contenido->closetags($noticia['texto']);
	    $Facebook="https://www.facebook.com/sharer.php?u=".$url;
	    $Twitter="http://www.twitter.com/share?url=".$url."&via=MiCuentaDeTwitter&hashtags=".$noticia['etiquetas'];
	    $Whatsapp="whatsapp://send?text=".$url;
	
	}

	$image_path = "resources/noticias/".$noticia['url'];
	$description = substr(htmlspecialchars_decode(addslashes(strip_tags ($noticia['texto']))),0,97).'...';

	$facebook_meta = "<meta property=\"og:url\" content=\"".$url."\" />
                    <meta property=\"og:type\" content=\"article\" />
                    <meta property=\"og:title\" content=\"".$noticia['cabecera']."\" />
                    <meta property=\"og:description\" content=\"".$description."\" />
                    <meta property=\"og:image\" content=\"".$image_path."\" />";

	$twitter_meta ="<meta name=\"twitter:card\" content=\"".$url."\">
                <meta name=\"twitter:title\" content=\"".$noticia['cabecera']."\">
                <meta name=\"twitter:url\" content=\"".$url."\">
                <meta name=\"twitter:description\" content=\"".$description."\">
                <meta name=\"twitter:image\" content=\"".$image_path."\">
                <meta name=\"twitter:domain\" content=\"".$_SERVER['SERVER_NAME']."\">";

    //$LastNews = $Contenido->GetLastNews();
    //var_dump($LastNews)*/
?>
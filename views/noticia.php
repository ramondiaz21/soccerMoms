<section >
  <img style="width: 100%;" src="<? echo NOTI_PATH?><?=$noticia['url']?>" class="card-img-top" id="imgNoticia">
</section>

<section class="noticia">
  <div class="noticia-wrapper">
    <h1><?=$noticia['cabecera']?></h1>
    <h6 style="display: inline-block">Por:&nbsp;<span style="color: #921c2f"><b><?=$noticia['creador']?></b>
    </span>&nbsp;·</h6>
    <small style="display: inline-block"><?=$noticia['fecha']?></small>

    <p class="text"><?=$noticia['texto']?></p>
  </div>
</section>
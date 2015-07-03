<?php /* Template Name: Modification Page */ get_header(); ?>
  <article class="c-article">
    <?php if (function_exists('dimox_breadcrumbs')) dimox_breadcrumbs(); ?>

    <h1 class="c-title"><?php echo empty( $post->post_parent ) ? get_the_title( $post->ID ) : get_the_post_thumbnail( $post->post_parent, 'medium'); ?>
    <?php if ( 0 == $post->post_parent ) {
      the_title();
    } else {
      $parents = get_post_ancestors( $post->ID );
      echo apply_filters( "the_title", get_the_title( end ( $parents ) ) );
      } ?></h1>
    <h2 class="d-title"><?php the_title(); ?>   <span><?php the_field('year'); ?></span></h2>

    <table class="list-modifications">
      <tr>
        <th>Описание детали</th>
        <th>Количество</th>
        <th>Комментарий</th>
        <th>Цена</th>
      </tr>
      <?php if( get_field('details') )
        {
          while( has_sub_field('details') )
          {
            ?>
      <tr>
        <td><?php the_sub_field('name'); ?></td>
        <td><?php the_sub_field('count'); ?></td>
        <td><?php the_sub_field('comment'); ?></td>
        <td><a rel="nofollow" target="_blank" href="http://www.a-detalka.ru/search?pcode=<?php the_sub_field('price'); ?>">Найти</a></td>
      </tr>
      <?php } } ?>
    </table><!-- /.list-modifications -->

  </article>
<?php get_footer(); ?>

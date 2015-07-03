<?php /* Template Name: Manufacturer First Page */ get_header(); ?>
  <article class="c-article">
    <?php if (function_exists('dimox_breadcrumbs')) dimox_breadcrumbs(); ?>
    <h1 class="c-title"><?php the_post_thumbnail('medium'); ?><?php the_title(); ?></h1>

    <ul class="list-model">

    <?php $children = get_pages(
      array(
          'sort_column' => 'menu_order',
          'sort_order' => 'ASC',
          'parent' => $post->ID
      ));
      foreach( $children as $post ) {
        setup_postdata( $post ); ?>

      <li>
        <a href="<?php the_permalink(); ?>">
          <?php the_post_thumbnail('medium'); ?>
          <span><?php the_title(); ?><br><?php the_field('year'); ?></span>
        </a>
      </li>

      <?php } ?>

    </ul><!-- list-model -->

  </article>
<?php get_footer(); ?>

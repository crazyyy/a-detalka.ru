<?php /* Template Name: Front Page */ get_header(); ?>
  <article>

    <ul class="list-first">
    <?php
      $args = array(
          'post_type'  => 'page',
          'showposts'  => 100,
          'meta_query' => array(
              array(
                  'key'   => '_wp_page_template',
                  'value' => 'page-manufacturer.php'
              )
          )
      );
      query_posts($args);
    ?>
    <?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>
      <li>
        <a href="<?php the_permalink(); ?>">
          <?php the_post_thumbnail('medium'); ?>
          <span><?php the_title(); ?></span>
        </a>
      </li>
    <?php endwhile; endif; ?>
    <?php wp_reset_query(); ?>
    </ul>

  </article>
<?php get_footer(); ?>

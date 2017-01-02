<?php /* Template Name: Model Page */ get_header(); ?>
  <article class="c-article">
    <?php if (function_exists('dimox_breadcrumbs')) dimox_breadcrumbs(); ?>
    <h1 class="c-title"><?php the_title(); ?>  <?php the_post_thumbnail('medium'); ?></h1>

    <table class="table-model">
      <tr>
        <th>Модификация</th>
        <th>Тип двигателя</th>
        <th>Привод</th>
        <th>Объем</th>
        <th>engines</th>
        <th>Лошадок</th>
        <th>Производство с</th>
      </tr>
      <?php $children = get_pages(
      array(
          'sort_column' => 'menu_order',
          'sort_order' => 'ASC',
          'parent' => $post->ID
      ));
      foreach( $children as $post ) {
        setup_postdata( $post ); ?>
      <tr>
        <td><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></td>
        <td><?php the_field('engine-type'); ?></td>
        <td><?php the_field('drive'); ?></td>
        <td><?php the_field('volume'); ?></td>
        <td><?php the_field('engines'); ?></td>
        <td><?php the_field('horsepower'); ?></td>
        <td><?php the_field('year'); ?></td>
      </tr>
      <?php } ?>
    </table><!-- /.table-model -->

  </article>
<?php get_footer(); ?>

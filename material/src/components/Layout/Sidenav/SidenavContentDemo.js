import React from 'react';
import { withRouter } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import $ from 'jquery';
import 'jquery-slimscroll/jquery.slimscroll.min';
import DEMO from 'constants/demoData';


class SidebarContent extends React.Component {

  componentDidMount() {
    const { history } = this.props;
    const nav = this.nav;
    const $nav = $(nav);

    // scroll
    $nav.slimscroll({
      height: '100%'
    });


    // Append icon to submenu
    $nav.find('.prepend-icon').prepend('<i class="material-icons">keyboard_arrow_right</i>');


    // AccordionNav
    const slideTime = 250;
    const $lists = $nav.find('ul').parent('li');
    $lists.append('<i class="material-icons icon-has-ul">arrow_drop_down</i>');
    const $As = $lists.children('a');

    // Disable A link that has ul
    $As.on('click', event => event.preventDefault());

    // Accordion nav
    $nav.on('click', (e) => {

      const target = e.target;
      const $parentLi = $(target).closest('li'); // closest, insead of parent, so it still works when click on i icons
      if (!$parentLi.length) return; // return if doesn't click on li
      const $subUl = $parentLi.children('ul');


      // let depth = $subUl.parents().length; // but some li has no sub ul, so...
      const depth = $parentLi.parents().length + 1;

      // filter out all elements (except target) at current depth or greater
      const allAtDepth = $nav.find('ul').filter(function () {
        if ($(this).parents().length >= depth && this !== $subUl.get(0)) {
          return true;
        }
        return false;
      });
      allAtDepth.slideUp(slideTime).closest('li').removeClass('open');

      // Toggle target
      if ($parentLi.has('ul').length) {
        $parentLi.toggleClass('open');
      }
      $subUl.stop().slideToggle(slideTime);

    });


    // HighlightActiveItems
    const $links = $nav.find('a');
    const currentLocation = history.location;
    function highlightActive(pathname) {
      const path = `#${pathname}`;

      $links.each((i, link) => {
        const $link = $(link);
        const $li = $link.parent('li');
        const href = $link.attr('href');
        // console.log(href);

        if ($li.hasClass('active')) {
          $li.removeClass('active');
        }
        if (path.indexOf(href) === 0) {
          $li.addClass('active');
        }
      });
    }
    highlightActive(currentLocation.pathname);
    history.listen((location) => {
      highlightActive(location.pathname);
    });
  }


  render() {

    return (
      <ul className="nav" ref={(c) => { this.nav = c; }}>
        <li className="nav-header"><span>Navigation</span></li>
        <li><Button href="#/app/dashboard"><i className="nav-icon material-icons">dashboard</i><span className="nav-text">Dashboard</span></Button></li>
        <li>
          <Button href="#/app/ui"><i className="nav-icon material-icons">card_giftcard</i><span className="nav-text">UI Kit</span></Button>
          <ul>
            <li><Button className="prepend-icon" href="#/app/ui/buttons"><span>Buttons</span></Button></li>
            <li><Button className="prepend-icon" href="#/app/ui/cards"><span>Cards</span></Button></li>
            <li><Button className="prepend-icon" href="#/app/ui/boxes"><span>Boxes</span></Button></li>
            <li><Button className="prepend-icon" href="#/app/ui/icons"><span>Icons</span></Button></li>
            <li><Button className="prepend-icon" href="#/app/ui/icon-boxes"><span>Icon Boxes</span></Button></li>
            <li><Button className="prepend-icon" href="#/app/ui/lists"><span>Lists</span><span className="badge badge-pill badge-success">9</span></Button></li>
            <li><Button className="prepend-icon" href="#/app/ui/pricing-tables"><span>Pricing Tables</span></Button></li>
            <li><Button className="prepend-icon" href="#/app/ui/timeline"><span>Timeline</span></Button></li>
            <li><Button className="prepend-icon" href="#/app/ui/feature-callouts"><span>Feature Callouts</span></Button></li>
            <li><Button className="prepend-icon" href="#/app/ui/components"><span>Components</span><span className="badge badge-pill badge-danger">11</span></Button></li>
            <li><Button className="prepend-icon" href="#/app/ui/hover"><span>Hover</span></Button></li>
            <li><Button className="prepend-icon" href="#/app/ui/sashes"><span>Sashes</span></Button></li>
            <li><Button className="prepend-icon" href="#/app/ui/testimonials"><span>Testimonials</span></Button></li>
            <li><Button className="prepend-icon" href="#/app/ui/call-to-actions"><span>Call to Actions</span></Button></li>
            <li><Button className="prepend-icon" href="#/app/ui/typography"><span>Typography</span></Button></li>
            <li><Button className="prepend-icon" href="#/app/ui/grids"><span>Grids</span></Button></li>
            <li><Button className="prepend-icon" href="#/app/ui/colors"><span>Colors</span></Button></li>
          </ul>
        </li>
        <li>
          <Button href="#/app/form"><i className="nav-icon material-icons">mode_edit</i><span className="nav-text">Forms</span></Button>
          <ul>
            <li>
              <Button className="prepend-icon" href="#/app/form/form-control"><span>Form Control</span></Button>
              <ul>
                <li><Button href="#/app/form/form-control/text-fields"><span>Input / Text Fields</span></Button></li>
                <li><Button href="#/app/form/form-control/radio-buttons"><span>Radio Buttons</span></Button></li>
                <li><Button href="#/app/form/form-control/switches"><span>Switches</span></Button></li>
                <li><Button href="#/app/form/form-control/checkboxes"><span>Checkboxes</span></Button></li>
                <li><Button href="#/app/form/form-control/selects"><span>Selects</span></Button></li>
                <li><Button href="#/app/form/form-control/pickers"><span>Date & Time Pickers</span></Button></li>
                <li><Button href="#/app/form/form-control/autocomplete"><span>Autocomplete</span></Button></li>
                <li><Button href="#/app/form/form-control/chips"><span>Chips</span></Button></li>
                <li><Button href="#/app/form/form-control/slider"><span>Slider</span></Button></li>
              </ul>
            </li>
            <li><Button className="prepend-icon" href="#/app/form/steppers"><span>Steppers</span></Button></li>
            <li><Button className="prepend-icon" href="#/app/form/layouts"><span>Form Layouts</span></Button></li>
          </ul>
        </li>
        <li>
          <Button href="#/app/table"><i className="nav-icon material-icons">list</i><span className="nav-text">Tables</span></Button>
          <ul>
            <li><Button className="prepend-icon" href="#/app/table/static"><span>Static Tables</span></Button></li>
            <li><Button className="prepend-icon" href="#/app/table/responsive"><span>Responsive Tables</span></Button></li>
            <li><Button className="prepend-icon" href="#/app/table/data-table"><span>Data Tables</span></Button></li>
          </ul>
        </li>
        <li>
          <Button href="#/app/chart"><i className="nav-icon material-icons">pie_chart_outlined</i><span className="nav-text">Charts</span></Button>
          <ul>
            <li><Button className="prepend-icon" href="#/app/chart/line"><span>Line & Area</span></Button></li>
            <li><Button className="prepend-icon" href="#/app/chart/bar"><span>Bar</span></Button></li>
            <li><Button className="prepend-icon" href="#/app/chart/pie"><span>Pie</span></Button></li>
            <li><Button className="prepend-icon" href="#/app/chart/scatter"><span>Scatter</span></Button></li>
            <li><Button className="prepend-icon" href="#/app/chart/radar"><span>Radar</span></Button></li>
            <li><Button className="prepend-icon" href="#/app/chart/funnel"><span>Funnel</span></Button></li>
            <li><Button className="prepend-icon" href="#/app/chart/more"><span>More</span></Button></li>
          </ul>
        </li>
        <li>
          <Button href="#/app/page"><i className="nav-icon material-icons">content_copy</i><span className="nav-text">Pages</span></Button>
          <ul>
            <li><Button className="prepend-icon" href="#/app/page/about"><span>About</span></Button></li>
            <li><Button className="prepend-icon" href="#/app/page/services"><span>Services</span></Button></li>
            <li><Button className="prepend-icon" href="#/app/page/careers"><span>Careers</span></Button></li>
            <li><Button className="prepend-icon" href="#/app/page/contact"><span>Contact</span></Button></li>
            <li><Button className="prepend-icon" href="#/app/page/faqs"><span>FAQs</span></Button></li>
            <li><Button className="prepend-icon" href="#/app/page/blog"><span>Blog</span></Button></li>
            <li><Button className="prepend-icon" href="#/app/page/terms"><span>Terms of Services</span></Button></li>
          </ul>
        </li>
        <li>
          <Button href="#/app/ecommerce"><i className="nav-icon material-icons">shopping_cart</i><span className="nav-text">eCommerce</span></Button>
          <ul>
            <li><Button className="prepend-icon" href="#/app/ecommerce/products"><span>Products</span></Button></li>
            <li><Button className="prepend-icon" href="#/app/ecommerce/v2-products"><span>Products v2</span></Button></li>
            <li><Button className="prepend-icon" href="#/app/ecommerce/invoice"><span>Invoice</span></Button></li>
          </ul>
        </li>
        <li className="nav-divider" />
        <li><Button href="#/app/extra"><i className="nav-icon material-icons">person_outline</i><span className="nav-text">Account</span></Button>
          <ul>
            <li><Button className="prepend-icon" href="#/user/login"><span>Login</span></Button></li>
            <li><Button className="prepend-icon" href="#/user/sign-up"><span>Sign Up</span></Button></li>
            <li><Button className="prepend-icon" href="#/user/forgot-password"><span>Forgot Password</span></Button></li>
            <li><Button className="prepend-icon" href="#/user/confirm-email"><span>Confirm Email</span></Button></li>
            <li><Button className="prepend-icon" href="#/user/lock-screen"><span>Lock Screen</span></Button></li>
          </ul>
        </li>
        <li><Button href="#/app/extra"><i className="nav-icon material-icons">error_outline</i><span className="nav-text">Exception</span></Button>
          <ul>
            <li><Button className="prepend-icon" href="#/app/exception/403"><span>403 Error</span></Button></li>
            <li><Button className="prepend-icon" href="#/exception/403"><span>403 Error (Fullscreen)</span></Button></li>
            <li><Button className="prepend-icon" href="#/app/exception/404"><span>404 Error</span></Button></li>
            <li><Button className="prepend-icon" href="#/exception/404"><span>404 Error (Fullscreen)</span></Button></li>
            <li><Button className="prepend-icon" href="#/app/exception/500"><span>500 Error</span></Button></li>
            <li><Button className="prepend-icon" href="#/exception/500"><span>500 Error (Fullscreen)</span></Button></li>
          </ul>
        </li>
        <li>
          <Button href="#/app/pglayout"><i className="nav-icon material-icons">desktop_windows</i><span className="nav-text">Page Layouts</span></Button>
          <ul>
            <li><Button className="prepend-icon" href="#/app/pglayout/full-width"><span>Full Width</span></Button></li>
            <li><Button className="prepend-icon" href="#/app/pglayout/centered"><span>Centered</span></Button></li>
            <li><Button className="prepend-icon" href="#/fullscreen"><span>Fullscreen</span></Button></li>
          </ul>
        </li>
        <li>
          <Button href="#/app/menu"><i className="nav-icon material-icons">sort</i><span className="nav-text">Menu Levels</span></Button>
          <ul>
            <li><Button className="prepend-icon" href={DEMO.link}><span>Level 1</span></Button></li>
            <li>
              <Button className="prepend-icon" href={DEMO.link}><span>Level 1</span></Button>
              <ul>
                <li><Button href={DEMO.link}><span>Level 2</span></Button></li>
                <li>
                  <Button href={DEMO.link}><span>Level 2</span></Button>
                  <ul>
                    <li><Button href={DEMO.link}><span>Level 3</span></Button></li>
                    <li><Button href={DEMO.link}><span>Level 3</span></Button></li>
                  </ul>
                </li>
              </ul>
            </li>
          </ul>
        </li>
        <li className="nav-divider" />
        <li className="nav-header"><span>Material Design</span></li>
        <li className="li-small"><Button href="#/app/ui/cards"><i className="nav-icon nav-dot material-icons color-success">fiber_manual_record</i><span className="nav-text">Material Cards</span></Button></li>
        <li className="li-small"><Button href="#/app/ui/icons"><i className="nav-icon nav-dot material-icons color-info">fiber_manual_record</i><span className="nav-text">Material Icons</span></Button></li>
      </ul>
    );
  }
}

export default withRouter(SidebarContent);

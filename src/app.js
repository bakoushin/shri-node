import global from './global.scss';

import MainBlock from './MainBlock/MainBlock.scss';
import Tabs from './Tabs/Tabs.scss';
import Files from './Files/Files.scss';
import Commits from './Commits/Commits.scss';
import Branches from './Branches/Branches.scss';
import Breadcrumbs from './Breadcrumbs/Breadcrumbs.scss';

if (module.hot) {
  module.hot.accept();
  module.hot.dispose(function () {
    clearInterval(timer);
  });
}

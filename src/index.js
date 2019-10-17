
import Header from './UI/header/header.component';
import Button from './UI/button/button.component';
import Input from './UI/input/input.component';
import Pagination from './UI/Pagination/Pagination';
import { Comment } from './UI/commet/comment.component';
import { PrivateRoute } from './UI/private_route/private_route.component';
import Menu from './UI/menu/menu.component';
import UnsuporterPage from './UI/unsuporter_page/unsuporter_page.component';
import CollapsibleResult from './UI/neoimporter/CollapsibleResult';
import ResultCard from './UI/neoimporter/ResultCard';
import Base from './UI/base/base.component';
import Icon from './UI/icon/icon.component';
import Login from './UI/login/login.component';
import DogiCard from './UI/login/dogiCard.component';
// import NeoImporter from './NeoImporter';

const pk = require('../package.json');
document.__zina_dogi_react =  {
    name: pk.name,
    version: pk.version,
    config: {
        neoimporter: {
            __project__http__: null
        }
    }
};

export {
    // NeoImporter,
    Header,
    PrivateRoute,
    Button,
    Input,
    Pagination,
    Menu,
    UnsuporterPage,
    Comment,
    CollapsibleResult,
    ResultCard,
    Base,
    Icon,
    Login,
    DogiCard
}
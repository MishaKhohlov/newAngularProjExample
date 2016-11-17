import angular from 'angular';
import {dataProvider} from './data.provider/data';
import {home} from './home/home';
import {careers} from './careers/careers';
import {company} from './company/company';
import {call_back_form} from './call_back_form/call_back_form';
import {services} from './services/services';
import {vacancy_description} from './vacancy_description/vacancy_description';
import {work} from './work/work';
import {work_about} from './work_about/work_about';
import {blog} from './blog/blog';
import {blog_about} from './blog_about/blog_about';
import {contacts} from './contacts/contacts';
import {admin} from './admin/admin';
import {admin_edit} from './admin_edit/admin_edit';
import {edit_section} from './edit_section/edit_section';
import {article} from './article/article';

const components = angular.module('app.components', [
  dataProvider.name,
  home.name,
  company.name,
  careers.name,
  call_back_form.name,
  services.name,
  vacancy_description.name,
  work.name,
  work_about.name,
  blog.name,
  blog_about.name,
  contacts.name,
  admin.name,
  admin_edit.name,
  edit_section.name,
  article.name
]);

export {components};

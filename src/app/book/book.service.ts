import { TreeviewItem } from 'ngx-treeview';

export class BookService {
  getBooks(): TreeviewItem[] {
    const childrenCategory = new TreeviewItem({
      text: 'Children', value: 1, collapsed: true, children: [
        { text: 'Baby 3-5', value: 11 },
        { text: 'Baby 6-8', value: 12 },
        { text: 'Baby 9-12', value: 13 }
      ]
    });
    const itCategory = new TreeviewItem({
      text: 'IT', value: 9, children: [
        {
          text: 'Programming', value: 91, children: [{
            text: 'Frontend', value: 911, children: [
              { text: 'Angular 11', value: 9113 , disabled: true},
              { text: 'Angular 12', value: 9114, disabled: true },
              { text: 'Angular 13', value: 9115 },
              { text: 'Angular 14', value: 9116 },
              { text: 'ReactJS', value: 9117, disabled: true },
              { text: 'VueJS', value: 9118, disabled: true }
            ]
          }, {
            text: 'Backend', value: 912, children: [
              { text: 'C#', value: 9121 },
              { text: 'Java', value: 9122 },
              { text: 'Python', value: 9123, checked: false, disabled: true },
              { text: 'Go', value: 9124, checked: false, disabled: true }
            ]
          }]
        },
        {
          text: 'Networking', value: 92, children: [
            { text: 'Internet', value: 921 },
            { text: 'Security', value: 922 },
            { text: 'Switches', value: 923 },
            { text: 'Routers', value: 924 },
          ]
        }
      ]
    });
    const teenCategory = new TreeviewItem({
      text: 'Teen', value: 2, collapsed: true, disabled: true, children: [
        { text: 'Adventure', value: 21 },
        { text: 'Science', value: 22 }
      ]
    });
    const extraCategory = new TreeviewItem({ text: 'Extra', value: 3, checked: false, });
    const othersCategory = new TreeviewItem({ text: 'Others', value: 3, checked: false, disabled: true });
    return [childrenCategory, itCategory, teenCategory, extraCategory,othersCategory];
  }
}

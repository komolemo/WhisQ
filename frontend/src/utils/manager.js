import faqData from '../data/faq.json';

export default function FAQ(choice) {
    const categories = ['service', 'category_1', 'category_2'];
    const nextCategories = ['service_id', 'category1_id', 'category2_id'];
    const object = {
        'current': null,
        'next': null,
    }
    if (choice) {
        const type = choice['type'];
        const id = choice['id'];
        object['current'] = faqData[categories[type]].find(v => v.id);
        object['next'] = faqData[categories[type + 1]].filter(c => c[nextCategories[type]] === id);
    } else {
        object['current'] = {'id': 0, 'label': '', 'question': '', 'type': 0};
        object['next'] = faqData[categories[0]];
    }
    return object;
}

//   "category_2": [
//     {
//       "id": 1,
//       "category1_id": 1,
//       "service_id": 4,
//       "label": "学習コンテンツ",
//       "question": "学習コンテンツについてお知りになりたいことをお選びください。"
//     },
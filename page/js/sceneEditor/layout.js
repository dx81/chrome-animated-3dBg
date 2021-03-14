import Category from "./components/category.js";
import Base from "./components/base.js"

export default new Base({},
    new Category({title : "Global options"}),
    new Category({title : "Entities"})
);
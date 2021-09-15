import { apiInitializer } from "discourse/lib/api";

export default apiInitializer("0.11.1", (api) => {
  ["discovery.category"].forEach((name) => {
    api.modifyClass(`route:${name}`, {
      renderTemplate(controller, model) {
        const isGalleryCategory =
          model && model.category && model.category.slug == "gallery"; // TODO: replace with setting
        const user = this.currentUser; // we'll want to check if they're an admin

        if (!isGalleryCategory) {
          this.render("navigation/category", { outlet: "navigation-bar" });
        } else {
          // TODO: replace with new nav system
        }

        if (this._categoryList) {
          this.render("discovery/categories", {
            outlet: "header-list-container",
            model: this._categoryList,
          });
        }

        this.render("discovery/topics", {
          outlet: "list-container",
        });
      },
    });
  });
});

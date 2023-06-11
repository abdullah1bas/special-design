let request = new XMLHttpRequest();
request.open("GET", "../test.json");
request.send();

request.onreadystatechange = function () {
  if (this.readyState === 4 && this.status === 200) {
    // Challenge 1
    console.log(request.responseText);
    ("#################################################################");
    console.log("#".repeat(20));

    // Needed Output Challenge 2
    console.log("JSON Object Content Here");
    console.log("Data Loaded");
    ("#################################################################");
    console.log("#".repeat(20));

    let mainData = JSON.parse(this.responseText);
    let data = document.createElement("div");

    for (let i = 0; i < mainData.length; i++) {
      // Challenge 4
      let content = document.createElement("div");
      let Title = document.createElement("h2");
      let Article = document.createElement("p");
      let Author = document.createElement("p");
      let Category = document.createElement("p");
      data.id = "data";
      Title.appendChild(document.createTextNode(mainData[i].title));
      Article.appendChild(document.createTextNode(mainData[i].body));
      Author.appendChild(
        document.createTextNode(`Category: ${mainData[i].category}`)
      );
      Category.appendChild(
        document.createTextNode(`Author: ${mainData[i].author}`)
      );

      content.appendChild(Title);
      content.appendChild(Article);
      content.appendChild(Category);
      content.appendChild(Author);
      data.appendChild(content);

      // mainData Variable Content Challenge 3
      mainData[i].category = "ALL";
      console.log(mainData[i]);
    }
    ("#################################################################");
    console.log("#".repeat(20));

    // UpdatedData Variable Content Challenge 3
    let updatedData = JSON.stringify(mainData);
    console.log(updatedData);
    ("#################################################################");
    console.log("#".repeat(20));

    // Challenge 4
    console.log(data);

    
  }
};

#Bias in Bias
Team members: Anubhav Arora, Nava Haghighi
Final Project for 6.894 Interactive Data Visualization

Project hosted on GitHub pages <a href="https://github.mit.edu/pages/6894-sp19/Project-Bias-/">here</a>

Due to hosting limitations, this GitHub pages is using a random sample subset of the 10 year data (from 2008-2018).
You can find the full dataset on <a href="https://www.dropbox.com/sh/n2zd0z8h92ct66s/AACUFcliyP2CFeGqYzpNe-b0a?dl=0">this</a> Dropbox folder.

Other Resources:
The final poster as well as initial Tableau interactions are hosted in the "videos" folder.

You can find the original presentation here:
<a href="https://docs.google.com/presentation/d/14L0Y9x3iu8b16XFag_BZ-mwiy_dCefYdSANCBWO6Tgo/edit?usp=sharing">Link to google drive presentation </a>
The projectBias.pdf file is a full mock-up of the visualization and narrative.

Introduction:
Implicit bias is different from known bias in a way that it exists subconsciously. This means that a person might not think of themself as prejudiced and consciously not have any biases, but unknowingly demonstrate biased behavior. This scenario can be especially dangerous because revealing the unknown biases can question the person’s fundamental beliefs about themself, making them defensive.
One step towards activating our recognition and acceptance of biases is de-stigmatizing bias. It is important to understand that our biases are a result of multiple factors, including external factors such as culture, income level, gender, and education, many of which are not under our control all the time. However, only when we recognize and acknowledge our implicit bias we can start to counteract its influence on our actions and decisions.

Vision:
Our initial goal going into the project was to de-stigmatize bias by showing that bias is human and that everyone has their biases. After exploring and examining the dataset in Tableau, we realized that visualizing this specific dataset in many commonly used ways can possibly strengthen existing biases. Therefore, in addition to educating and showing people that biases are not necessarily bad and that we are all inherently biased, we decided to also try and create an interactive visualization of this dataset that highlights nuances that may not be seen initially in the data.

Our 3 goals was to:
      1. Show that humans are biased but biases are not inherently bad.
      2. Show that the averages do not tell the full story.
      3. Show that being biased is a complex combination of many factors, most of which are external (such as neighborhood diversity).

Inspiration/motivation:
      We were very inspired by the narrative visualizations on http://explorabl.es and the narrative storytelling visualizations on New York Times like <a href="https://www.nytimes.com/interactive/2018/08/30/climate/how-much-hotter-is-your-hometown.html">this</a>. In addition to that, we found multiple existing visualizations of the same dataset that was static and used large bins (such as state). We did not find any visualizations mapping implicit and explicit bias.

Steps:
      1. Identify Bias Type: We decided to explore Racial bias because it had many data points, contained additional questions such as "have you experienced discrimination" or "are your parents biased?" These questions were of particular interest to us because they could give insight into external factors that can play a role in racial bias that were beyond the typical demographics.

      2. Clean the data: This step took a long time. The data was very messy. Because the data was collected over 16 years there were a lot of changes that had happened over the years and we had to address those changes. We cleaned the whole dataset but decided to use a 10 year subset for our final visualization. Additionally there was no mappable geographic information present so we had to hack the dataset and find ways to map the location.

      3. Find other data that can supplement this visualization. Because one of our main goals was to show the complexity behind bias, we looked for datasets that can show external factors that may play a role in forming bias. We eventually used a dataset containing percentage of different races in each county to calculate the diversity index which is the probability of having two people with the same race. 0 being least diverse and 1 meaning you have a 100% chance of finding people from two different race if you picked two random samples. Additionally, we mapped data from Opportunity Insights about neighborhood characteristics by county dataset.

      4. Tableau Explorations + Design Mockup: We originally wanted to design and visualize a "bias" badge that focused on the de-stigmatizing bias idea. However after exploring the data we saw an opportunity in providing ways for people to explore it. Much of our process focused on refining this process and how to combine educating about implicit and explicit bias, de-stigmatizing and decoupling negative connotations of bias, and open exploration of the dataset without strengthening existing biases.

      5. Final production: The biggest hurdle in this step was finding the appropriate tools to visualize the dataset. We tried many different libraries; dc, crossfilter, vega, vega-lite, mapbox, leaflet, and d3. Due to our large dataset and wanting to have more flexibility in editing the final output, we decided to use d3.

Final Outcome:
      Our final project consists of three sections, each corresponding to one of our three goals. We have discussed the methods and the limitations at length in the paper.

Work Split:
      Our team consistently met over the course of this project and we collaborated a lot especially in the beginning ideation and concept-development and exploration section.
      At a higher level, Anubhav focused on data and data clean up, and Nava focused on design, mockup development, and final execution, framework, and integration.  
      Ideation: Nava + Anubhav
      Concept generation: Nava + (brainstorming sessions) Anubhav
      Data wrangling: Anubhav + (brainstorming sessions) Nava
      Data exploration: Anubhav + (Nava)
      html/css/JS + sliders: Nava
      d3: Nava (map) Anubhav (charts)

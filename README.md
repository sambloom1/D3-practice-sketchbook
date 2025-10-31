# D3-practice-sketchbook
A collection of random d3 visuals for practice rather than showcasing


## Olympics Line Chart

<img width="801" height="652" alt="image" src="https://github.com/user-attachments/assets/6726f8f1-2e80-4720-9b89-d576339a0c72" />

### Reflections for v1 <br>
- **Good** - concepts of combining story telling of two stories with the Title, annotations and Line wiht a mini bar graph. Having a grouped element for the mini podium meant I didnt have to go from innerChart origin.<br>
   - The for Each loop mean I could draw three lines with the paramter being the medals. <br>
   - Creating the flags from scratch and parametrising the bar heights to help with the placement of them. <br>
   
- **Improvement** - Cleaner way to code up the bar chart. Ended up making half the code and was very manual <br>
  - The x axis was squashed as didnt centralise the text elements. Could have added cicrcls to the line chart to highligh each games. <br>
  - The constants of medal and colour could have been a separate file, which would have contributed to cleaner code. <br>
  - Could include text annotation of Olympic dates in the mini podium which helps distguish the podium flags being where it took place. Not Brazil or France medals but GB medals at these olympics. <br>
  - Parametrising the flags of the mini podium. Would it be possible to have mini icons/images saved within csv which could be called on. Or I could create svg flags for the 7 Olympic game locations. Ultimatley leading to an interactive/filtered graph that could return any countries medal chart as well as mini podium. 

  

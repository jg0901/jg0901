<div align="center">

<img src="./assets/jemma-data-lab-banner.svg" alt="Jemma's Data Lab — I make messy data make sense" width="100%" />

<br>

**Mathematics educator → Aspiring Data Engineer**  
*Curious about why data breaks, how pipelines work, and what makes analytics trustworthy.*

<img src="https://img.shields.io/badge/Databricks-DE%20Associate-FF5F57?style=for-the-badge&logo=databricks&logoColor=white" alt="Databricks Certified Data Engineer Associate">
<img src="https://img.shields.io/badge/Focus-Data%20Quality-18B6AC?style=for-the-badge" alt="Focus on data quality">
<img src="https://img.shields.io/badge/Origin-Mathematics-8B75E8?style=for-the-badge" alt="Mathematics background">

</div>

---

### 💻 `~/jemma` — a quick introduction

```text
$ whoami
  Jemma — aspiring Data Engineer, math educator, lifelong learner

$ current_mission
  Build pipelines that don't just run — they can be trusted.

$ favorite_questions
  Where did this row come from? Why is it missing? What could break?
```

<table>
<tr>
<td width="50%" valign="top">
<h3>🛠️ At my workbench</h3>
<ul>
<li><strong>Languages:</strong> SQL, Python, PySpark</li>
<li><strong>Platform:</strong> Databricks, Apache Spark, Delta Lake</li>
<li><strong>Patterns:</strong> ETL/ELT, medallion architecture, dimensional modeling</li>
<li><strong>Dev workflow:</strong> Git, GitHub, VS Code</li>
</ul>
</td>
<td width="50%" valign="top">
<h3>🧪 What I'm experimenting with</h3>
<ul>
<li>Systematic data quality checks</li>
<li>CI/CD and production-friendly Databricks workflows</li>
<li>Incremental ingestion and reliable transformations</li>
<li>Math, simulation &amp; data science side quests</li>
</ul>
</td>
</tr>
</table>

### 🗂️ Featured experiments

<table>
<tr>
<td width="50%" valign="top">
<p><strong>🚕 <a href="https://github.com/jg0901/NYC-Mobility-Data-Pipeline">NYC Mobility Pipeline</a></strong></p>
<p>Taxi data ingestion, transformations, quality checks, and analytical modeling.</p>
<code>Databricks</code> · <code>SQL</code> · <code>Data Quality</code>
</td>
<td width="50%" valign="top">
<p><strong>🛒 <a href="https://github.com/jg0901/Week6-Instacart-Pipeline">Instacart Pipeline</a></strong></p>
<p>Incremental ingestion, validation gates, and medallion processing.</p>
<code>Lakeflow</code> · <code>Auto Loader</code> · <code>PySpark</code>
</td>
</tr>
<tr>
<td width="50%" valign="top">
<p><strong>🎵 <a href="https://github.com/jg0901/Week5-Chinook-Dimensional-Model">Chinook Dimensional Model</a></strong></p>
<p>From normalized source tables to a star schema and business-ready views.</p>
<code>SQL</code> · <code>Star Schema</code> · <code>Analytics</code>
</td>
<td width="50%" valign="top">
<p><strong>🛍️ <a href="https://github.com/jg0901/Week4-Retail-Loyalty-Purchasing-Behavior-Pipeline">Retail Loyalty Pipeline</a></strong></p>
<p>Bronze–Silver–Gold pipeline with warning flags and quality controls.</p>
<code>Lakeflow</code> · <code>Delta Lake</code> · <code>Validation</code>
</td>
</tr>
</table>

### 🌱 Lab activity — small steps, real progress

Not every learning session becomes a commit, but here's where my experiments take shape.

| 🧪 Current lab quests | What I'm practicing |
|:--|:--|
| 🔧 **Pipeline reliability** | Data checks, testing and simpler workflows |
| 🚀 **Ship with confidence** | Git, CI/CD and deployment patterns |
| 🧠 **Math side quests** | Probability, simulation and problem solving |

**The green squares:** GitHub's live contribution calendar is just below this profile README. It reflects qualifying GitHub activity, not every hour of learning.

### 🎮 Math Arcade

<div align="center">
  <img src="./assets/math-arcade-001.svg" alt="Math Arcade Level 001: The Checksum Mystery. Sequence: 3, 8, 15, 24, 35, question mark." width="100%" />
</div>

<details>
<summary><strong>🔓 Unlock the answer — Puzzle #001</strong></summary>

**Answer: 48.** The differences are `5, 7, 9, 11, 13`, so the next number is `35 + 13 = 48`.

For day `n = 1, 2, 3, …`, the rule is `n * (n + 2)`.

```sql
SELECT day_number, day_number * (day_number + 2) AS puzzle_value
FROM days;
```

**Data quality footnote:** This is a number-pattern puzzle, not a production checksum. Actual checksums depend on record contents and require a defined validation method.

</details>

<sub>🧩 More math puzzles may appear here as the lab grows.</sub>

### 🪄 A little more about me

<details>
<summary><b>📐 Why a math educator ended up building data pipelines</b></summary>
<br>
I started in mathematics and teaching, where I learned to ask *why* a solution works — not just whether it produces an answer. Data engineering scratches the same itch: testing assumptions, tracing issues to their source, and building systems that hold up under scrutiny.
</details>

<details>
<summary><b>🔭 What's next in the lab?</b></summary>
<br>
I'm developing my skills in production-oriented data engineering, particularly CI/CD, ingestion patterns, testing, and maintainability. I'm also exploring small, curiosity-driven math and data science experiments along the way.
</details>

---

<div align="center">

**`SELECT curiosity, consistency, growth FROM my_journey;`**

<sub>Made with ☕, SQL, and a suspicious number of data quality checks.</sub>

</div>

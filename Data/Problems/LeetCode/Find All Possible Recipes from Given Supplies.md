# 2115. Find All Possible Recipes from Given Supplies

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/find-all-possible-recipes-from-given-supplies](https://leetcode.com/problems/find-all-possible-recipes-from-given-supplies)
**Companies:** Amazon, Bloomberg, Docusign, Google, Meta, Microsoft, Tesla, Tiktok, Uber, Verily, Zeta

---

## Problem Description

You have information about `n` different recipes. You are given a string array `recipes` and a 2D string array `ingredients`. The `i^th` recipe has the name `recipes[i]`, and you can **create** it if you have **all** the needed ingredients from `ingredients[i]`. A recipe can also be an ingredient for **other** recipes, i.e., `ingredients[i]` may contain a string that is in `recipes`.

You are also given a string array `supplies` containing all the ingredients that you initially have, and you have an infinite supply of all of them.

Return *a list of all the recipes that you can create.* You may return the answer in **any order**.

Note that two recipes may contain each other in their ingredients.

**Constraints:**

- `n == recipes.length == ingredients.length`
- `1 <= n <= 100`
- `1 <= ingredients[i].length, supplies.length <= 100`
- `1 <= recipes[i].length, ingredients[i][j].length, supplies[k].length <= 10`
- `recipes[i], ingredients[i][j]`, and `supplies[k]` consist only of lowercase English letters.
- All the values of `recipes` and `supplies` combined are unique.
- Each `ingredients[i]` does not contain any duplicate values.

---

## Key Insight

> Model dependencies as a DAG: recipe → its non-supply ingredients. Topological sort resolves which recipes become available as their dependencies are satisfied.

---

## Approach: Topological Sort — O(V + E) ✅

```text
FUNCTION findAllRecipes(recipes, ingredients, supplies):
    SET supplySet ← SET(supplies)
    DICTIONARY graph ← {}
    DICTIONARY inDegree ← {r: 0 FOR r IN recipes}

    FOR i, recipe IN ENUMERATE(recipes):
        FOR ing IN ingredients[i]:
            IF ing NOT IN supplySet:
                IF ing NOT IN graph:
                    graph[ing] ← []
                APPEND recipe TO graph[ing]
                SET inDegree[recipe] ← inDegree[recipe] + 1

    LIST queue ← [r FOR r IN recipes IF inDegree[r] == 0]
    LIST result ← []

    WHILE queue IS NOT EMPTY:
        SET recipe ← queue.DEQUEUE()
        APPEND recipe TO result
        FOR dependent IN graph.GET(recipe, []):
            SET inDegree[dependent] ← inDegree[dependent] - 1
            IF inDegree[dependent] == 0:
                queue.ENQUEUE(dependent)

    RETURN result
```

---

## Examples

```
Example 1:
  Input: recipes = ["bread"], ingredients = [["yeast","flour"]], supplies = ["yeast","flour","corn"]
  Output: ["bread"]
  Explanation:
  We can create "bread" since we have the ingredients "yeast" and "flour".
```

```
Example 2:
  Input: recipes = ["bread","sandwich"], ingredients = [["yeast","flour"],["bread","meat"]], supplies = ["yeast","flour","meat"]
  Output: ["bread","sandwich"]
  Explanation:
  We can create "bread" since we have the ingredients "yeast" and "flour".
  We can create "sandwich" since we have the ingredient "meat" and can create the ingredient "bread".
```

```
Example 3:
  Input: recipes = ["bread","sandwich","burger"], ingredients = [["yeast","flour"],["bread","meat"],["sandwich","meat","bread"]], supplies = ["yeast","flour","meat"]
  Output: ["bread","sandwich","burger"]
  Explanation:
  We can create "bread" since we have the ingredients "yeast" and "flour".
  We can create "sandwich" since we have the ingredient "meat" and can create the ingredient "bread".
  We can create "burger" since we have the ingredient "meat" and can create the ingredients "bread" and "sandwich".
```

---

## Walkthrough

Consider Example 1.
1. **Initialize** `supplySet = {flour, yeast, ham}`.
2. Build graph and in-degree:
   - "bread" needs `flour` and `yeast` → both in supplies → inDegree["bread"] = 0.
   - "sandwich" needs `bread` (not a supply) and `ham` → edge `bread → sandwich`, inDegree["sandwich"] = 1.
3. Queue starts with `"bread"` (inDegree 0).
4. Dequeue `"bread"`, add to result.
5. Process its outgoing edge: decrement inDegree["sandwich"] to 0, enqueue `"sandwich"`.
6. Dequeue `"sandwich"`, add to result.
7. Queue empty → finish. Result `["bread", "sandwich"]`.

---

## Complexity Analysis

- **Time:** O(V + E) where V is the number of recipes plus unique ingredients and E is the total number of ingredient-to-recipe edges.
- **Space:** O(V + E) for the graph, in-degree map, and queue.

---

## Key Takeaway

> **Dependency resolution = topological sort. Supplies have in-degree 0. Recipes with all ingredients available (in-degree 0) can be made, unlocking dependent recipes.**
# 2115. Find All Possible Recipes from Given Supplies

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/find-all-possible-recipes-from-given-supplies](https://leetcode.com/problems/find-all-possible-recipes-from-given-supplies)
**Companies:** Amazon, Bloomberg, Docusign, Google, Meta, Microsoft, Tesla, Tiktok, Uber, Verily, Zeta

---

## Problem Description

Given `recipes`, their `ingredients`, and available `supplies`, find which recipes can be made. Recipes can depend on other recipes.

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

**Example 1:**
```
recipes = ["bread", "sandwich"]
ingredients = [["flour", "yeast"], ["bread", "ham"]]
supplies = ["flour", "yeast", "ham"]
```
**Output:** `["bread", "sandwich"]`
Explanation: With the initial supplies we can make "bread". That unlocks "sandwich" because its ingredient "bread" is now available.

**Example 2:**
```
recipes = ["pizza"]
ingredients = [["dough", "tomato", "cheese"]]
supplies = ["dough", "tomato"]
```
**Output:** `[]`
Explanation: "cheese" is missing and there are no other recipes to produce it.

---

## Walkthrough

Consider Example 1.
1. **Initialize** `supplySet = {flour, yeast, ham}`.
2. Build graph and in‑degree:
   - "bread" needs `flour` and `yeast` → both in supplies → inDegree["bread"] = 0.
   - "sandwich" needs `bread` (not a supply) and `ham` → edge `bread → sandwich`, inDegree["sandwich"] = 1.
3. Queue starts with `"bread"` (inDegree 0).
4. Dequeue `"bread"`, add to result.
5. Process its outgoing edge: decrement inDegree["sandwich"] to 0, enqueue `"sandwich"`.
6. Dequeue `"sandwich"`, add to result.
7. Queue empty → finish. Result `["bread", "sandwich"]`.

---

## Complexity Analysis

- **Time:** O(V + E) where V is the number of recipes plus unique ingredients and E is the total number of ingredient‑to‑recipe edges.
- **Space:** O(V + E) for the graph, in‑degree map, and queue.

---

## Key Takeaway

> **Dependency resolution = topological sort. Supplies have in-degree 0. Recipes with all ingredients available (in-degree 0) can be made, unlocking dependent recipes.**
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

```
FUNCTION findAllRecipes(recipes, ingredients, supplies):
    supplySet = SET(supplies)
    graph = {}
    inDegree = {r: 0 for r in recipes}

    FOR i, recipe IN enumerate(recipes):
        FOR ing IN ingredients[i]:
            IF ing NOT IN supplySet:
                graph.setdefault(ing, []).ADD(recipe)
                inDegree[recipe] += 1

    queue = [r for r in recipes if inDegree[r] == 0]
    result = []

    WHILE queue:
        recipe = queue.DEQUEUE()
        result.ADD(recipe)
        FOR dependent IN graph.get(recipe, []):
            inDegree[dependent] -= 1
            IF inDegree[dependent] == 0:
                queue.ENQUEUE(dependent)

    RETURN result
```

---

## Key Takeaway

> **Dependency resolution = topological sort. Supplies have in-degree 0. Recipes with all ingredients available (in-degree 0) can be made, unlocking dependent recipes.**

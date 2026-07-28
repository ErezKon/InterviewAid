# 1600. Throne Inheritance

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/throne-inheritance](https://leetcode.com/problems/throne-inheritance)
**Companies:** Google, Snowflake

---

## Problem Description
The kingdom maintains a royal family tree. Initially, the king is alive. The system receives two types of events: `birth(parent, child)` adds a child to a parent, and `death(name)` marks a person as deceased. At any point, `getInheritanceOrder()` should return the current succession order: a depth‑first preorder traversal of the family tree, skipping deceased members.

## Examples
| Events | Output |
|--------|--------|
| `birth(king, "andy")`, `birth(king, "bob")`, `death("andy")`, `getInheritanceOrder()` | `["king", "bob"]` |
| `birth(bob, "carl")`, `getInheritanceOrder()` | `["king", "bob", "carl"]` |

## Approach
Use a hash map `children` where each person maps to a list of their children in birth order. Maintain a `dead` set. For `getInheritanceOrder`, perform a DFS starting from the king, appending a name to the result only if it is not in `dead`.

```text
FUNCTION getInheritanceOrder():
    SET order ← []
    CALL dfs(king, order)
    RETURN order

FUNCTION dfs(person, order):
    IF person NOT IN dead:
        APPEND person TO order
    FOR child IN children[person]:
        CALL dfs(child, order)
```

## Walkthrough
Consider the sequence `birth(king, "andy")`, `birth(king, "bob")`, `death("andy")`, `birth(bob, "carl")`.
| Step | Action | children map | dead set | DFS order |
|------|--------|--------------|----------|-----------|
| 1 | birth king→andy | {king:[andy]} | {} | – |
| 2 | birth king→bob | {king:[andy,bob]} | {} | – |
| 3 | death andy | {king:[andy,bob]} | {andy} | – |
| 4 | birth bob→carl | {king:[andy,bob], bob:[carl]} | {andy} | king, bob, carl |

## Complexity Analysis
*Time*: `O(N)` for a full inheritance query where `N` is the number of people alive or dead (DFS visits each node once). Updates are `O(1)`. 
*Space*: `O(N)` for the `children` map and recursion stack.

## Follow‑Up Questions
1. How would you support removal of a person from the tree (e.g., abdication)?
2. How to handle multiple simultaneous queries efficiently?
3. Can you extend the model to support ranking by age within the same generation?

## Key Takeaway
A simple hash‑map tree combined with a depth‑first traversal yields the correct inheritance order while efficiently handling births and deaths.

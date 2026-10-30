# 1600. Throne Inheritance

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/throne-inheritance](https://leetcode.com/problems/throne-inheritance)
**Companies:** Google, Snowflake

---

## Problem Description

A kingdom consists of a king, his children, his grandchildren, and so on. Every once in a while, someone in the family dies or a child is born.

The kingdom has a well-defined order of inheritance that consists of the king as the first member. Let's define the recursive function `Successor(x, curOrder)`, which given a person `x` and the inheritance order so far, returns who should be the next person after `x` in the order of inheritance.

```
Successor(x, curOrder):
    if x has no children or all of x's children are in curOrder:
        if x is the king return null
        else return Successor(x's parent, curOrder)
    else return x's oldest child who's not in curOrder
```

For example, assume we have a kingdom that consists of the king, his children Alice and Bob (Alice is older than Bob), and finally Alice's son Jack.

1. In the beginning, `curOrder` will be `["king"]`.
2. Calling `Successor(king, curOrder)` will return Alice, so we append to `curOrder` to get `["king", "Alice"]`.
3. Calling `Successor(Alice, curOrder)` will return Jack, so we append to `curOrder` to get `["king", "Alice", "Jack"]`.
4. Calling `Successor(Jack, curOrder)` will return Bob, so we append to `curOrder` to get `["king", "Alice", "Jack", "Bob"]`.
5. Calling `Successor(Bob, curOrder)` will return `null`. Thus the order of inheritance will be `["king", "Alice", "Jack", "Bob"]`.

Using the above function, we can always obtain a unique order of inheritance.

Implement the `ThroneInheritance` class:

- `ThroneInheritance(string kingName)` Initializes an object of the `ThroneInheritance` class. The name of the king is given as part of the constructor.
- `void birth(string parentName, string childName)` Indicates that `parentName` gave birth to `childName`.
- `void death(string name)` Indicates the death of `name`. The death of the person doesn't affect the `Successor` function nor the current inheritance order. You can treat it as just marking the person as dead.
- `string[] getInheritanceOrder()` Returns a list representing the current order of inheritance **excluding** dead people.

**Constraints:**
- `1 <= kingName.length, parentName.length, childName.length, name.length <= 15`
- `kingName`, `parentName`, `childName`, and `name` consist of lowercase English letters only.
- All arguments `childName` and `kingName` are **distinct**.
- All `name` arguments of `death` will be passed to either the constructor or as `childName` to `birth` first.
- For each call to `birth(parentName, childName)`, it is guaranteed that `parentName` is alive.
- At most `10^5` calls will be made to `birth` and `death`.
- At most `10` calls will be made to `getInheritanceOrder`.

## Examples

**Example 1:**
```
Input
["ThroneInheritance", "birth", "birth", "birth", "birth", "birth", "birth", "getInheritanceOrder", "death", "getInheritanceOrder"]
[["king"], ["king", "andy"], ["king", "bob"], ["king", "catherine"], ["andy", "matthew"], ["bob", "alex"], ["bob", "asha"], [null], ["bob"], [null]]
Output
[null, null, null, null, null, null, null, ["king", "andy", "matthew", "bob", "alex", "asha", "catherine"], null, ["king", "andy", "matthew", "alex", "asha", "catherine"]]

Explanation
ThroneInheritance t= new ThroneInheritance("king"); // order: king
t.birth("king", "andy"); // order: king > andy
t.birth("king", "bob"); // order: king > andy > bob
t.birth("king", "catherine"); // order: king > andy > bob > catherine
t.birth("andy", "matthew"); // order: king > andy > matthew > bob > catherine
t.birth("bob", "alex"); // order: king > andy > matthew > bob > alex > catherine
t.birth("bob", "asha"); // order: king > andy > matthew > bob > alex > asha > catherine
t.getInheritanceOrder(); // return ["king", "andy", "matthew", "bob", "alex", "asha", "catherine"]
t.death("bob"); // order: king > andy > matthew > bob > alex > asha > catherine
t.getInheritanceOrder(); // return ["king", "andy", "matthew", "alex", "asha", "catherine"]
```

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

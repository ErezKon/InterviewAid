# 1996. The Number of Weak Characters in the Game

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/the-number-of-weak-characters-in-the-game](https://leetcode.com/problems/the-number-of-weak-characters-in-the-game)
**Companies:** Google, Pinterest

---

## Problem Description
You are playing a game that contains multiple characters, and each of the characters has **two** main properties: **attack** and **defense**. You are given a 2D integer array `properties` where `properties[i] = [attack_i, defense_i]` represents the properties of the `i`-th character in the game.

A character is said to be **weak** if any other character has **both** attack and defense levels **strictly greater** than this character's attack and defense levels. More formally, a character `i` is said to be **weak** if there exists another character `j` where `attack_j > attack_i` and `defense_j > defense_i`.

Return *the number of **weak** characters*.

**Constraints:**
- `2 <= properties.length <= 10^5`
- `properties[i].length == 2`
- `1 <= attack_i, defense_i <= 10^5`

## Examples
```
Example 1:
  Input: properties = [[5,5],[6,3],[3,6]]
  Output: 0
  Explanation: No character has strictly greater attack and defense than the other.
```
```
Example 2:
  Input: properties = [[2,2],[3,3]]
  Output: 1
  Explanation: The first character is weak because the second character has a strictly greater attack and defense.
```
```
Example 3:
  Input: properties = [[1,5],[10,4],[4,3]]
  Output: 1
  Explanation: The third character is weak because the second character has a strictly greater attack and defense.
```

## Approach
Sort characters by decreasing attack; for equal attack, sort by increasing defense. Scan the sorted list while keeping the maximum defense seen so far. If the current character's defense is less than the max defense, it is weak.

```text
FUNCTION countWeakCharacters(properties):
    SORT properties BY attack DESCENDING, defense ASCENDING
    maxDef ← 0
    weakCount ← 0
    FOR (atk, def) IN properties:
        IF def < maxDef:
            SET weakCount ← weakCount + 1
        ELSE:
            SET maxDef ← def
    RETURN weakCount
```
The sorting ensures that any previously seen character has attack ≥ current attack; the max defense tracks the strongest defense among those with higher attack.

## Walkthrough
| Step | (atk,def) | maxDef before | Action |
|------|-----------|---------------|--------|
| 1 | (6,3) | 0 | maxDef ← 3 |
| 2 | (5,5) | 3 | def (5) > maxDef → maxDef ← 5 |
| 3 | (3,6) | 5 | def (6) > maxDef → maxDef ← 6 (not weak) |
| … | … | … | Continue for all entries. |

## Complexity Analysis
- **Time:** O(n log n) for sorting, O(n) for the scan.
- **Space:** O(1) extra space besides the input array (in‑place sort).

## Follow-Up Questions
1. How would you adapt the algorithm if the definition of weak required `attack_j >= attack_i` and `defense_j > defense_i`?
2. Can this be solved in O(n) time using a counting sort when attack values are bounded?
3. How would you extend the solution to also return the list of weak character indices?

## Key Takeaway
Sorting by decreasing attack and tracking the maximum defense lets you identify weak characters in a single linear pass.

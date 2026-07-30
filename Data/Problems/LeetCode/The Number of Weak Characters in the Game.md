# 1996. The Number of Weak Characters in the Game

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/the-number-of-weak-characters-in-the-game](https://leetcode.com/problems/the-number-of-weak-characters-in-the-game)
**Companies:** Google, Pinterest

---

## Problem Description
You are given an array `properties` where `properties[i] = [attack_i, defense_i]` represents the attack and defense values of the i‑th character. A character `i` is **weak** if there exists another character `j` with `attack_j > attack_i` **and** `defense_j > defense_i`. Return the number of weak characters.

## Examples
**Example 1:**
```
properties = [[5,5],[6,3],[3,6]]
Output = 1
```
The first character is weak because the second character has higher attack (6 > 5) and higher defense (3 is not >5) actually not, the third has lower attack. Wait correct: character 2 (6,3) is not weak, character 3 (3,6) is weak because character 1 (5,5) has higher attack and higher defense. So only one weak character.

**Example 2:**
```
properties = [[2,2],[3,3]]
Output = 0
```
No character is strictly dominated.

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

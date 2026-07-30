# 135. Candy

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/candy](https://leetcode.com/problems/candy)
**Companies:** Accenture, Amazon, Bending Spoons, Bloomberg, Dropbox, Flipkart, Goldman Sachs, Google, Ibm, Infosys, Meta, Microsoft, Morgan Stanley, Oracle, Phonepe, Roku, Salesforce, Sap, Tiktok, Uber, Urban Company, Visa, Walmart Labs

---

## 1. Problem Description

Give candies to `n` children with ratings. Each child gets ≥ 1. A child with a higher rating than a neighbor must get more candies. Return minimum total.

---

## 2. Approach: Two Passes — O(n) ✅

```text
FUNCTION candy(ratings):
    n = len(ratings)
    candies = [1] * n

    // Left to right: handle right neighbors
    FOR i ← 1 TO n - 1:
        IF ratings[i] > ratings[i - 1]:
            candies[i] = candies[i - 1] + 1

    // Right to left: handle left neighbors
    FOR i ← n - 2 DOWN TO 0:
        IF ratings[i] > ratings[i + 1]:
            candies[i] = MAX(candies[i], candies[i + 1] + 1)

    RETURN SUM(candies)
```

| Time | Space |
|------|-------|
| O(n) | O(n) |

---

## 3. Examples

**Example 1:**
```
ratings = [1,0,2]
```
- Left‑to‑right pass gives candies `[1,1,2]`.
- Right‑to‑left pass updates middle child to `2` because `0 < 2` on the right, resulting `[1,2,2]`.
- Minimum total = `5`.

**Example 2:**
```
ratings = [1,2,2]
```
- After left pass: `[1,2,1]`.
- Right pass makes no changes.
- Minimum total = `4`.

---

## 4. Walkthrough

Take `ratings = [1,0,2]`:
1. Initialise `candies = [1,1,1]`.
2. **Left‑to‑right**:
   - i=1: rating 0 ≤ rating 1 → no change.
   - i=2: rating 2 > rating 0 → `candies[2] = candies[1] + 1 = 2` → `[1,1,2]`.
3. **Right‑to‑left**:
   - i=1: rating 0 < rating 2 → no change.
   - i=0: rating 1 > rating 0 → `candies[0] = MAX(1, candies[1] + 1) = 2` → `[2,1,2]`.
4. Final candies `[2,1,2]` sum to `5` (minimum satisfying constraints).

---

## 5. Complexity Analysis

- **Time:** O(n) – two linear passes over the ratings array.
- **Space:** O(n) – extra array to store candies for each child.

---

## Follow-Up Questions

- How would the solution change if children could be given any non‑negative number of candies (allowing zero)?
- Can you solve the problem in O(1) extra space by modifying the ratings array in‑place?
- What if the neighbor constraint applies only to the left neighbor?

---

## Key Takeaway

> Two greedy passes—first left‑to‑right, then right‑to‑left—ensure each child satisfies the higher‑rating‑than‑neighbor rule with the minimum total candies.

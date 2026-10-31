# 851. Loud and Rich

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/loud-and-rich](https://leetcode.com/problems/loud-and-rich)
**Companies:** Amazon, De Shaw, Meta, Microsoft, Paypal, Phonepe

---

## 1. Problem Description

There is a group of `n` people labeled from `0` to `n - 1` where each person has a different amount of money and a different level of quietness.

You are given an array `richer` where `richer[i] = [a_i, b_i]` indicates that `a_i` has more money than `b_i` and an integer array `quiet` where `quiet[i]` is the quietness of the `i^th` person. All the given data in richer are **logically correct** (i.e., the data will not lead you to a situation where `x` is richer than `y` and `y` is richer than `x` at the same time).

Return *an integer array *`answer`* where *`answer[x] = y`* if *`y`* is the least quiet person (that is, the person *`y`* with the smallest value of *`quiet[y]`*) among all people who definitely have equal to or more money than the person *`x`.

**Constraints:**
- `n == quiet.length`
- `1 <= n <= 500`
- `0 <= quiet[i] < n`
- All the values of `quiet` are **unique**.
- `0 <= richer.length <= n * (n - 1) / 2`
- `0 <= a_i, b_i < n`
- `a_i != b_i`
- All the pairs of `richer` are **unique**.
- The observations in `richer` are all logically consistent.

---

## 2. Approach: DFS/Topological Sort — O(V+E) ✅

```text
FUNCTION loudAndRich(richer, quiet):
    n ← LEN(quiet)
    graph ← ARRAY of n empty lists
    FOR [a, b] IN richer:
        // a is richer than b
        graph[b].APPEND(a)

    answer ← ARRAY of n values INITIALIZED TO -1

    FUNCTION dfs(person):
        IF answer[person] != -1: RETURN
        answer[person] ← person
        FOR richerPerson IN graph[person]:
            dfs(richerPerson)
            IF quiet[answer[richerPerson]] < quiet[answer[person]]:
                answer[person] ← answer[richerPerson]

    FOR i FROM 0 TO n-1:
        dfs(i)
    RETURN answer
```

---

## 3. Examples

**Example 1:**
```
Input: richer = [[1,0],[2,1],[3,1],[3,7],[4,3],[5,3],[6,3]], quiet = [3,2,5,4,6,1,7,0]
Output: [5,5,2,5,4,5,6,7]
Explanation: answer[0] = 5.
Person 5 has more money than 3, which has more money than 1, which has more money than 0.
The only person who is quieter (has lower quiet[x]) is person 7, but it is not clear if they have more money than person 0.
answer[7] = 7.
Among all people that definitely have equal to or more money than person 7 (which could be persons 3, 4, 5, 6, or 7), the person who is the quietest (has lower quiet[x]) is person 7.
The other answers can be filled out with similar reasoning.
```

**Example 2:**
```
Input: richer = [], quiet = [0]
Output: [0]
```

---

## 4. Walkthrough

Consider `richer = [[1,0],[2,1],[3,1],[3,2]]` and `quiet = [3,2,5,4]`.
1. Build graph: 0 → [1]; 1 → [2,3]; 2 → [3].
2. Start DFS at person 0: answer[0]=0, recurse to 1.
3. DFS at 1: answer[1]=1, recurse to 2.
4. DFS at 2: answer[2]=2, recurse to 3.
5. DFS at 3: answer[3]=3 (quiet[3]=4). Return.
6. Backtrack: compare quiet values, propagate the quietest index up the chain. Final answers: [2,2,5,4].

---

## 5. Complexity Analysis

- **Time:** Each person visited once, each edge traversed once → `O(V + E)`.
- **Space:** Graph adjacency list and recursion stack → `O(V + E)`.

---

## 6. Follow-Up Questions

- How would you modify the solution if the richer relationships could form cycles?
- Can you solve the problem iteratively using topological ordering instead of recursion?

---

## 7. Key Takeaway

> Build a graph from richer relationships and use DFS with memoization to propagate the quietest person from richer ancestors to each individual.

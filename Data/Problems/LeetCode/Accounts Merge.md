# 721. Accounts Merge

**Difficulty:** 🟡 Medium
**Acceptance:** 58.0%
**LeetCode:** [https://leetcode.com/problems/accounts-merge](https://leetcode.com/problems/accounts-merge)
**Companies:** Airbnb, Amazon, Anduril, Bloomberg, Bytedance, Docusign, Google, Grab, Linkedin, Meta, Microsoft, Palantir, Phonepe, Pinterest, Rippling, Snapchat, Tiktok, Uber

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: Union-Find — O(n·α(n)) ✅](#4-approach-union-find--onαn-)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)
8. [Key Takeaway](#8-key-takeaway)

---

## 1. Problem Description

Given a list of accounts where each account has a name followed by a list of emails, merge accounts that share **at least one common email**. Two accounts with the same name but no common email are different people. Return merged accounts with the name first, followed by emails in **sorted order**.

**Constraints:**
- `1 ≤ accounts.length ≤ 1000`
- `2 ≤ accounts[i].length ≤ 10`
- `1 ≤ accounts[i][j].length ≤ 30`

---

## 2. Examples

```
Example 1:
  Input:  [["John","john00@mail.com","john_newyork@mail.com"],
           ["John","john00@mail.com","johnsmith@mail.com"],
           ["Mary","mary@mail.com"]]
  Output: [["John","john00@mail.com","john_newyork@mail.com","johnsmith@mail.com"],
           ["Mary","mary@mail.com"]]
  Explanation: First two accounts share "john00@mail.com" → merge.
```

Visual:
```
Account 1: john00 ── john_newyork
Account 2: john00 ── johnsmith
                ↓ (shared email "john00")
Merged:    john00 ── john_newyork
              └──── johnsmith
```

---

## 3. Key Insight

> This is a **connected components** problem. Each account defines edges between its emails. If two accounts share any email, their email sets merge. Union-Find efficiently tracks these merging groups.

---

## 4. Approach: Union-Find — O(n·α(n)) ✅

```
FUNCTION accountsMerge(accounts):
    parent = {}      // email → parent email
    emailToName = {} // email → account name

    // Build union-find
    FOR account IN accounts:
        name = account[0]
        FOR email IN account[1:]:
            emailToName[email] = name
            union(account[1], email)

    // Group emails by root
    groups = {}
    FOR email IN parent:
        root = find(email)
        groups[root].ADD(email)

    // Build result
    result = []
    FOR root, emails IN groups:
        result.ADD([emailToName[root]] + SORT(emails))

    RETURN result
```

Alternative: BFS/DFS on a graph where emails are nodes and accounts create edges between their emails.

---

## 5. Walkthrough

```
accounts = [["John","A","B"], ["John","A","C"], ["Mary","D"]]

Step 1 — Union-Find:
  Account 1: union(A, A), union(A, B) → A─B
  Account 2: union(A, A), union(A, C) → A─B─C (A already exists)
  Account 3: union(D, D) → D

Step 2 — Group by root:
  find(A)=A, find(B)=A, find(C)=A, find(D)=D
  groups = {A: [A,B,C], D: [D]}

Step 3 — Build result:
  ["John", A, B, C] (sorted)
  ["Mary", D]
```

---

## 6. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(n·α(n)) ≈ O(n) where n = total emails |
| **Space** | O(n) for union-find + email-to-name map |

---

## 7. Follow-Up Questions

### 7.1 Union-Find vs DFS — when to use which?

Union-Find is cleaner when you only need component membership. DFS/BFS is better when you need to traverse the graph for other reasons (e.g., shortest path). Both are O(n) here.

### 7.2 What if accounts arrive as a stream?

Union-Find handles this naturally — just union new emails with existing ones as they arrive. DFS would require rebuilding the graph.

### 7.3 Related connected-components problems?

| Problem | Connection |
|---------|-----------|
| **Number of Islands** (#200) | Grid-based components |
| **Friend Circles** (#547) | Adjacency matrix components |
| **Redundant Connection** (#684) | Cycle detection via UF |

---

## 8. Key Takeaway

> Account merge is a **connected components** problem. Union-Find with path compression gives near-O(1) per operation. Build edges between emails in the same account, then group by component.

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

Given a list of `accounts` where each element `accounts[i]` is a list of strings, where the first element `accounts[i][0]` is a name, and the rest of the elements are **emails** representing emails of the account.

Now, we would like to merge these accounts. Two accounts definitely belong to the same person if there is some common email to both accounts. Note that even if two accounts have the same name, they may belong to different people as people could have the same name. A person can have any number of accounts initially, but all of their accounts definitely have the same name.

After merging the accounts, return the accounts in the following format: the first element of each account is the name, and the rest of the elements are emails **in sorted order**. The accounts themselves can be returned in **any order**.

**Constraints:**
- `1 ≤ accounts.length ≤ 1000`
- `2 ≤ accounts[i].length ≤ 10`
- `1 ≤ accounts[i][j].length ≤ 30`
- `accounts[i][0]` consists of English letters.
- `accounts[i][j]` (for `j > 0`) is a valid email.

---

## 2. Examples

```
Example 1:
  Input: accounts = [["John","johnsmith@mail.com","john_newyork@mail.com"],["John","johnsmith@mail.com","john00@mail.com"],["Mary","mary@mail.com"],["John","johnnybravo@mail.com"]]
  Output: [["John","john00@mail.com","john_newyork@mail.com","johnsmith@mail.com"],["Mary","mary@mail.com"],["John","johnnybravo@mail.com"]]
  Explanation:
  The first and second John's are the same person as they have the common email "johnsmith@mail.com".
  The third John and Mary are different people as none of their email addresses are used by other accounts.
  We could return these lists in any order, for example the answer [['Mary', 'mary@mail.com'], ['John', 'johnnybravo@mail.com'],
  ['John', 'john00@mail.com', 'john_newyork@mail.com', 'johnsmith@mail.com']] would still be accepted.

Example 2:
  Input: accounts = [["Gabe","Gabe0@m.co","Gabe3@m.co","Gabe1@m.co"],["Kevin","Kevin3@m.co","Kevin5@m.co","Kevin0@m.co"],["Ethan","Ethan5@m.co","Ethan4@m.co","Ethan0@m.co"],["Hanzo","Hanzo3@m.co","Hanzo1@m.co","Hanzo0@m.co"],["Fern","Fern5@m.co","Fern1@m.co","Fern0@m.co"]]
  Output: [["Ethan","Ethan0@m.co","Ethan4@m.co","Ethan5@m.co"],["Gabe","Gabe0@m.co","Gabe1@m.co","Gabe3@m.co"],["Hanzo","Hanzo0@m.co","Hanzo1@m.co","Hanzo3@m.co"],["Kevin","Kevin0@m.co","Kevin3@m.co","Kevin5@m.co"],["Fern","Fern0@m.co","Fern1@m.co","Fern5@m.co"]]
```

Visual (Example 1):
```
Account 1: johnsmith ── john_newyork
Account 2: johnsmith ── john00
                ↓ (shared email "johnsmith")
Merged:    johnsmith ── john_newyork
              └──── john00
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

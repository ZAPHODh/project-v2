"use client";

import { useModal } from "@/lib/context/modal-context";
import Modal from "../modal";
import Input from "../ui/input";
import { Fragment, useState } from "react";
import {
  Button,
  Card,
  Datepicker,
  Label,
  Select,
  Textarea,
} from "flowbite-react";
import { createExpense, createExpenseCategory } from "@/lib/data/api-data";
import { Expense, ExpenseCategory } from "@prisma/client";
import { translateKey } from "@/lib/utils/translateKey";
import { ExpenseData } from "../../../types/db";
import { NewCategory } from "./new-category-";

type NewExpenseModalType = {
  handleNewExpense: (expense: ExpenseData) => void;
  categories: ExpenseCategory[];
  handleNewCategory: (category: ExpenseCategory) => void;
};

export function NewExpenseModal({
  handleNewExpense,
  categories,
  handleNewCategory,
}: NewExpenseModalType) {
  const { close } = useModal();
  const [expense, setExpense] = useState<Partial<Expense>>({});

  const [cachedCategory, setCachedCategory] = useState(categories);

  const inputs: (keyof Expense)[] = ["description", "amount"];

  const handleClick = async () => {
    const { description, amount, categoryId, date } = expense;

    if (!description || !amount || !date || !categoryId) return;

    const newExpense = await createExpense({
      description,
      amount: Number(amount),
      categoryId,
      date,
    });
    handleNewExpense(newExpense);
    handleNewCategory(newExpense.category);
    close();
  };
  const handleCreateCategory = (category: ExpenseCategory) => {
    setCachedCategory((prev) => [...prev, category]);
  };
  return (
    <Modal isOpen={true} close={close} size="small">
      <Modal.Title close={close}>Adicionar Despesa</Modal.Title>
      <Modal.Body>
        {inputs.map((input) =>
          input === "description" ? (
            <Fragment key={input}>
              <div className="mb-2 block">
                <Label htmlFor="comment" value={translateKey(input)} />
              </div>
              <Textarea
                id="comment"
                placeholder="Deixe uma descrição..."
                value={expense[input] || ""}
                onChange={(e) => {
                  const value = e.target.value;
                  setExpense((prevExpense) => ({
                    ...prevExpense,
                    [input]: value,
                  }));
                }}
                required
                rows={4}
              />
            </Fragment>
          ) : (
            <Input
              key={input}
              label={translateKey(input)}
              name={input}
              value={
                expense[input] instanceof Date
                  ? expense[input].toISOString().split("T")[0]
                  : expense[input] || ""
              }
              onChange={(e) => {
                const value =
                  input === "amount"
                    ? parseFloat(e.target.value) || ""
                    : e.target.value;
                setExpense((prevExpense) => ({
                  ...prevExpense,
                  [input]: value,
                }));
              }}
            />
          )
        )}

        {cachedCategory.length > 0 && (
          <>
            <div className="mb-2 block">
              <Label htmlFor="comment" value="Categoria" />
            </div>
            <Select
              value={expense.categoryId || ""}
              onChange={(e) =>
                setExpense((prev) => ({ ...prev, categoryId: e.target.value }))
              }
            >
              <option value="">Selecione uma categoria</option>
              {cachedCategory.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </Select>
          </>
        )}
        <NewCategory handleCreateCategory={handleCreateCategory} />
        <label className="block text-sm font-medium text-gray-700">
          Data da Despesa
        </label>
        <Datepicker
          language="pt-BR"
          labelTodayButton="Hoje"
          labelClearButton="Limpar"
          value={expense.date ? new Date(expense.date) : new Date()}
          onChange={(date) =>
            setExpense((prevExpense) => ({
              ...prevExpense,
              date: date as Date,
            }))
          }
        />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleClick}>Criar</Button>
      </Modal.Footer>
    </Modal>
  );
}

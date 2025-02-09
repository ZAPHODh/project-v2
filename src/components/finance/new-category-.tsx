"use client";

import { Button } from "flowbite-react";
import { Toast } from "flowbite-react";
import { useState } from "react";
import { HiOutlineArrowRight } from "react-icons/hi";
import { FloatingLabel } from "flowbite-react";
import { createExpenseCategory } from "@/lib/data/api-data";
import { ExpenseCategory } from "@prisma/client";

type NewCategoryType = {
  handleCreateCategory: (category: ExpenseCategory) => void;
};

export function NewCategory({ handleCreateCategory }: NewCategoryType) {
  const [showNewCategoryInput, setShowNewCategoryInput] = useState(false);
  const [newCategory, setNewCategory] = useState<Partial<ExpenseCategory>>({
    name: "",
  });

  const handleNewCategory = async () => {
    if (!newCategory || newCategory.name === "") return;
    const createdCategory = await createExpenseCategory(newCategory);
    handleCreateCategory(createdCategory);
  };

  return (
    <div className="my-4">
      {!showNewCategoryInput && (
        <Button
          color="gray"
          onClick={() => setShowNewCategoryInput((prev) => !prev)}
        >
          Adicionar nova categoria
          <HiOutlineArrowRight className="ml-2 h-5 w-5" />
        </Button>
      )}

      {showNewCategoryInput && (
        <Toast className="max-w-xs my-2">
          <div className="flex items-center gap-2">
            <FloatingLabel
              variant="filled"
              label="Nova Categoria"
              name="newCategory"
              value={newCategory.name}
              onChange={(e) =>
                setNewCategory((prev) => ({ ...prev, name: e.target.value }))
              }
            />
            <Button
              className="h-[52px] flex items-center mb-2"
              onClick={handleNewCategory}
            >
              Salvar
            </Button>
          </div>
          <Toast.Toggle onClick={() => setShowNewCategoryInput(false)} />
        </Toast>
      )}
    </div>
  );
}

import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import Swal from "sweetalert2";

/* ===============================
   SUPABASE CONFIG (LANGSUNG)
================================ */
const supabaseUrl = "https://nbyljyhzawxsojgwhyta.supabase.co";
const supabaseKey =
  "sb_publishable_gSPdAWI-oxNEHdWYSIyrYw_T0AHYDVE";

const supabase = createClient(supabaseUrl, supabaseKey);

/* ===============================
   CUSTOM MODAL
================================ */
const CustomModal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 backdrop-blur-xl"
        onClick={onClose}
      />
      <div className="relative bg-white dark:bg-gray-800 rounded-xl shadow-lg max-w-md w-full mx-4">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
};

/* ===============================
   MAIN COMPONENT
================================ */
const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    position: "",
    content: "",
  });

  const [errors, setErrors] = useState({});

  /* ===============================
     FETCH DATA
  ================================ */
  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    const { data, error } = await supabase
      .from("testimonials")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) setTestimonials(data);
  };

  /* ===============================
     FORM HANDLER
  ================================ */
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    const err = {};
    if (!formData.name) err.name = "Nama wajib diisi";
    if (!formData.email) err.email = "Email wajib diisi";
    if (!formData.position) err.position = "Posisi wajib diisi";
    if (!formData.content || formData.content.length < 10)
      err.content = "Minimal 10 karakter";

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  /* ===============================
     SUBMIT
  ================================ */
  const handleSubmit = async () => {
    if (!validate()) return;
    setIsSubmitting(true);

    const { error } = await supabase.from("testimonials").insert([
      {
        name: formData.name,
        email: formData.email,
        position: formData.position,
        content: formData.content,
        rating: 5,
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(
          formData.name
        )}&background=1f2937&color=fff`,
      },
    ]);

    setIsSubmitting(false);

    if (error) {
      Swal.fire("Error", "Gagal mengirim feedback", "error");
      return;
    }

    Swal.fire("Berhasil", "Feedback terkirim!", "success");
    setFormData({ name: "", email: "", position: "", content: "" });
    setIsModalOpen(false);
    fetchTestimonials();
  };

  /* ===============================
     RENDER
  ================================ */
  return (
    <section className="min-h-screen p-6 bg-white dark:bg-gray-800">
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800 dark:text-white">
        Feedback
      </h2>

      <div className="max-w-3xl mx-auto mb-6 text-center">
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-6 py-2 bg-gray-800 text-white rounded-lg"
        >
          Tambah Feedback
        </button>
      </div>

      <div className="max-w-3xl mx-auto space-y-4">
        {testimonials.map((t) => (
          <div
            key={t.id}
            className="p-4 border rounded-lg bg-white dark:bg-gray-700"
          >
            <p className="mb-2 text-gray-800 dark:text-white">
              “{t.content}”
            </p>
            <div className="flex items-center gap-3">
              <img
                src={t.avatar}
                alt={t.name}
                className="w-10 h-10 rounded-full"
              />
              <div>
                <p className="font-semibold text-gray-800 dark:text-white">
                  {t.name}
                </p>
                <p className="text-sm text-gray-500">{t.position}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL */}
      <CustomModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="p-6 space-y-4">
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Nama"
            className="w-full p-2 border rounded"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}

          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full p-2 border rounded"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )}

          <input
            name="position"
            value={formData.position}
            onChange={handleChange}
            placeholder="Posisi"
            className="w-full p-2 border rounded"
          />
          {errors.position && (
            <p className="text-red-500 text-sm">{errors.position}</p>
          )}

          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            placeholder="Feedback"
            className="w-full p-2 border rounded"
          />
          {errors.content && (
            <p className="text-red-500 text-sm">{errors.content}</p>
          )}

          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="w-full py-2 bg-gray-800 text-white rounded"
          >
            {isSubmitting ? "Mengirim..." : "Kirim"}
          </button>
        </div>
      </CustomModal>
    </section>
  );
};

export default Testimonials;

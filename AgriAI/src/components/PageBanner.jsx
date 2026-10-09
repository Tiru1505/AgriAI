import { motion } from "framer-motion";

import FieldScene from "./FieldScene";


function PageBanner({ title, subtitle, variant }) {

  return (

    <motion.div

      className="page-banner"

      initial={{
        opacity: 0,
        y: -30
      }}

      animate={{
        opacity: 1,
        y: 0
      }}

    >

      <div>

        <h1>
          {title}
        </h1>

        <p>
          {subtitle}
        </p>

      </div>

      <FieldScene variant={variant} />

    </motion.div>

  );

}

export default PageBanner;

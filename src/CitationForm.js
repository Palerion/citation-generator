import React, { useState } from "react";

function CitationForm() {
  const [sourceType, setSourceType] = useState("book");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [publisher, setPublisher] = useState("");
  const [url, setUrl] = useState("");
  const [accessDate, setAccessDate] = useState("");
  const [style, setStyle] = useState("APA7");
  const [formattedCitation, setFormattedCitation] = useState("");

  const capitalizeTitle = (title) => {
    return title.replace(/\b\w/g, (char) => char.toUpperCase());
  };

  const convertDateToMLA9WebsiteFormat = (date) => {
    const months = [
      "Jan.",
      "Feb.",
      "Mar.",
      "Apr.",
      "May",
      "Jun.",
      "Jul.",
      "Aug.",
      "Sep.",
      "Oct.",
      "Nov.",
      "Dec.",
    ];
    const dateObj = new Date(date);
    const day = dateObj.getDate();
    const month = months[dateObj.getMonth()];
    const year = dateObj.getFullYear();

    return `${day} ${month} ${year}`;
  };

  const generateCitation = () => {
    let citation = "";
    let formattedTitle = title;

    // Check if all necessary fields are filled out
    if (
      lastName === "" ||
      firstName === "" ||
      title === "" ||
      year === "" ||
      publisher === ""
    ) {
      setFormattedCitation("Please fill out all necessary fields.");
      return;
    }

    // Check if URL and access date are filled out for website citations
    if (sourceType === "website" && (url === "" || accessDate === "")) {
      setFormattedCitation(
        "Please fill out all necessary fields for website citation."
      );
      return;
    }

    switch (style) {
      case "APA7":
        formattedTitle = `<i>${formattedTitle}</i>`;
        citation =
          sourceType === "book"
            ? `${lastName}, ${firstName[0]}. (${year}). ${formattedTitle}. ${publisher}.`
            : `${lastName}, ${
                firstName[0]
              }. (${year}). ${formattedTitle}. ${capitalizeTitle(
                publisher
              )}. Retrieved ${accessDate}, from ${url}`;
        break;
      case "MLA9":
        formattedTitle =
          sourceType === "book"
            ? `<i>${capitalizeTitle(formattedTitle)}</i>`
            : `"${capitalizeTitle(formattedTitle)}."`;
        citation =
          sourceType === "book"
            ? `${lastName}, ${firstName}. ${formattedTitle}. ${capitalizeTitle(
                publisher
              )}, ${year}.`
            : `${lastName}, ${firstName}. ${formattedTitle} <i>${capitalizeTitle(
                publisher
              )}</i>, ${year}, ${url}. Accessed ${convertDateToMLA9WebsiteFormat(
                accessDate
              )}.`;
        break;
      case "ChicagoAD":
        formattedTitle =
          sourceType === "book"
            ? `<i>${capitalizeTitle(formattedTitle)}</i>`
            : `"${capitalizeTitle(formattedTitle)}."`;
        citation =
          sourceType === "book"
            ? `${lastName}, ${firstName}. ${year}. ${formattedTitle}. ${publisher}.`
            : `${lastName}, ${firstName}. ${year}. ${formattedTitle} ${capitalizeTitle(
                publisher
              )}. ${year}. Accessed ${accessDate}. ${url}.`;
        break;
      case "ChicagoBib":
        formattedTitle =
          sourceType === "book"
            ? `<i>${capitalizeTitle(formattedTitle)}</i>`
            : `"${capitalizeTitle(formattedTitle)}."`;
        citation =
          sourceType === "book"
            ? `${lastName}, ${firstName}. ${formattedTitle}. ${publisher}, ${year}.`
            : `${lastName}, ${firstName}. ${formattedTitle} ${capitalizeTitle(
                publisher
              )}, ${year}. Accessed ${accessDate}. ${url}.`;
        break;
      default:
        citation = "Style not supported";
    }

    setFormattedCitation(citation);
  };

  return (
    <div>
      <div>
        <label>
          Source Type:
          <select
            value={sourceType}
            onChange={(e) => setSourceType(e.target.value)}
          >
            <option value="book">Book</option>
            <option value="website">Website</option>
          </select>
        </label>
      </div>
      <div>
        <label>
          Author's First Name:{" "}
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Author's Last Name:{" "}
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Title:{" "}
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Year:{" "}
          <input
            type="text"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Publisher/Website Name:{" "}
          <input
            type="text"
            value={publisher}
            onChange={(e) => setPublisher(e.target.value)}
          />
        </label>
      </div>
      {sourceType === "website" && (
        <>
          <div>
            <label>
              URL:{" "}
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
            </label>
          </div>
          <div>
            <label>
              Access Date:{" "}
              <input
                type="text"
                value={accessDate}
                onChange={(e) => setAccessDate(e.target.value)}
                placeholder="e.g., July 15, 2023"
              />
            </label>
          </div>
        </>
      )}
      <div>
        <label>
          Style:
          <select value={style} onChange={(e) => setStyle(e.target.value)}>
            <option value="APA7">APA7</option>
            <option value="MLA9">MLA9</option>
            <option value="ChicagoAD">Chicago (Author-Date)</option>
            <option value="ChicagoBib">Chicago (Bibliography)</option>
          </select>
        </label>
      </div>
      <div>
        <button onClick={generateCitation}>Generate Citation</button>
      </div>
      {formattedCitation && (
        <div>
          <strong>Formatted Citation:</strong>
          <p dangerouslySetInnerHTML={{ __html: formattedCitation }}></p>
        </div>
      )}
    </div>
  );
}

export default CitationForm;
